import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    console.log('Creating permission with data:', createPermissionDto);
    const permission = this.permissionRepository.create(createPermissionDto);

    const savedPermission = await this.permissionRepository.save(permission);
    console.log('Permission saved:', savedPermission);
    return savedPermission;
  }

  findAll() {
    return this.permissionRepository.find();
  }

  find(options?: FindManyOptions<Permission>) {
    return this.permissionRepository.find(options);
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.update(
      { id },
      updatePermissionDto,
    );
    console.log(permission);
    if (permission.affected === 0) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async remove(id: number) {
    const deleted = await this.permissionRepository.delete({ id });
    if (deleted.affected === 0) {
      throw new NotFoundException('Permission not found');
    }

    return deleted;
  }
}
