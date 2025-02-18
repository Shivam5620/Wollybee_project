import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '@repo/ui/dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { RolePermission } from './entities/rolePermission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private permissionService: PermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { permissions, ...newRole } = createRoleDto;

    return await this.roleRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create a new role
        const role = transactionalEntityManager.create(Role, newRole);

        // Save the role first to get the ID
        const savedRole = await transactionalEntityManager.save(role);

        // Fetch all permissions based on permissionIds from createRoleDto
        const permissionIds = permissions.map((p) => p.permissionId);
        const fetchedPermissions = await this.permissionService.find({
          where: { id: In(permissionIds) },
        });

        // Validate permissions and create RolePermission entities
        const rolePermissions: RolePermission[] = [];
        for (const permissionDto of permissions) {
          const permission = fetchedPermissions.find(
            (p) => p.id === permissionDto.permissionId,
          );
          if (!permission) {
            throw new NotFoundException(
              `Permission with id ${permissionDto.permissionId} not found`,
            );
          }

          // Validate allowedPermissions against permission.allowedPermissions
          if (
            !permissionDto.allowedPermissions.every((allowedPermission) =>
              permission.allowedPermissions.includes(allowedPermission),
            )
          ) {
            throw new BadRequestException(
              `Invalid allowedPermissions for permission id ${permission.id}. Available values are ${permission.allowedPermissions.join(',')}`,
            );
          }

          // Create RolePermission entity
          const rolePermission = transactionalEntityManager.create(
            RolePermission,
            {
              role: savedRole,
              permission,
              allowedPermissions: permissionDto.allowedPermissions,
            },
          );
          rolePermissions.push(rolePermission);
        }

        // Save RolePermission entities
        await transactionalEntityManager.save(rolePermissions);

        // Reload the role to include the relations
        return transactionalEntityManager.findOne(Role, {
          where: { id: savedRole.id },
          relations: ['rolePermissions'],
        });
      },
    );
  }

  findAll() {
    return this.roleRepository.find({
      relations: ['rolePermissions', 'rolePermissions.permission'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { permissions, ...roleUpdates } = updateRoleDto;

    return this.roleRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Find the role to update
        const role = await transactionalEntityManager.findOne(Role, {
          where: { id },
          relations: ['rolePermissions', 'rolePermissions.permission'],
        });
        if (!role) {
          throw new NotFoundException(`Role with id ${id} not found`);
        }

        // Update role properties
        transactionalEntityManager.merge(Role, role, roleUpdates);
        const updatedRole = await transactionalEntityManager.save(role);

        // Fetch all permissions based on permissionIds from updateRoleDto
        const permissionIds = permissions.map((p) => p.permissionId);
        const fetchedPermissions = await this.permissionService.find({
          where: { id: In(permissionIds) },
        });

        // Validate permissions and handle RolePermission entities
        const rolePermissions: RolePermission[] = [];
        for (const permissionDto of permissions) {
          const permission = fetchedPermissions.find(
            (p) => p.id === permissionDto.permissionId,
          );
          if (!permission) {
            throw new NotFoundException(
              `Permission with id ${permissionDto.permissionId} not found`,
            );
          }

          // Check if the role already has this permission
          const existingRolePermission = role.rolePermissions.find(
            (rp) => rp.permission.id === permission.id,
          );

          if (existingRolePermission) {
            // Update existing RolePermission
            existingRolePermission.allowedPermissions =
              permissionDto.allowedPermissions;
            rolePermissions.push(existingRolePermission);
          } else {
            // Create new RolePermission
            const newRolePermission = transactionalEntityManager.create(
              RolePermission,
              {
                role: updatedRole,
                permission,
                allowedPermissions: permissionDto.allowedPermissions,
              },
            );
            rolePermissions.push(newRolePermission);
          }
        }

        // Remove RolePermissions that are not in permissions array
        const permissionsToRemove = role.rolePermissions.filter(
          (rp) => !permissionIds.includes(rp.permission.id),
        );
        await transactionalEntityManager.remove(permissionsToRemove);

        // Save RolePermission entities
        await transactionalEntityManager.save(rolePermissions);

        // Reload the role to include the updated relations
        return transactionalEntityManager.findOne(Role, {
          where: { id: updatedRole.id },
          relations: ['rolePermissions'],
        });
      },
    );
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.roleRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return;
  }
}
