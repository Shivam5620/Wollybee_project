import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@repo/ui/dto/user.dto';
import { PaginationDto } from '@repo/ui/dto/pagination.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { GetPaginatedQueryDto } from '@repo/ui/dto/common.dto';

const relations = [
  'role',
  'role.rolePermissions',
  'role.rolePermissions.permission',
];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roleId } = createUserDto;
    const role = await this.roleService.findOne(roleId);
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    console.log('Creating user with data:', createUserDto);
    const user = this.userRepository.create(createUserDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    user.role = role;

    const savedUser = await this.userRepository.save(user);
    console.log('User saved:', savedUser);
    delete savedUser.password;
    delete savedUser.salt;
    return savedUser;
  }

  findAll() {
    return this.userRepository.find({
      relations,
    });
  }

  findPaginated(options: IPaginationOptions) {
    return paginate<User>(this.userRepository, options, {
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    if (!options.relations) options.relations = relations;
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { roleId } = updateUserDto;
    if (roleId) {
      const newRole = await this.roleService.findOne(roleId);

      if (!newRole) {
        throw new BadRequestException('Role not found');
      }

      user.role = newRole;
      delete updateUserDto.roleId;
    }

    // Generate a new salt and hash password if password is updated
    if (updateUserDto.password) {
      user.salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        user.salt,
      );
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user, {
      reload: true,
    });
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.userRepository.softDelete({ id });
    if (deleted.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}
