import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { AllowedPermission } from '@repo/ui/enums/permission';
import { IRolePermission } from '@repo/ui/types';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['role', 'permission'], { unique: true })
export class RolePermission implements Omit<IRolePermission, 'role'> {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: Permission })
  permission: Permission;

  @Column({
    type: 'enum',
    enum: AllowedPermission,
    array: true,
    default: [],
  })
  @ApiProperty({
    example: [AllowedPermission.CREATE, AllowedPermission.READ],
    enum: AllowedPermission,
    isArray: true,
    enumName: 'AllowedPermission',
    description: 'Allowed Permissions',
  })
  allowedPermissions: AllowedPermission[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2021-07-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2021-07-01T00:00:00.000Z' })
  updatedAt: Date;
}
