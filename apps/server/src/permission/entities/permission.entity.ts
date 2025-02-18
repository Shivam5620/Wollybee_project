import { AllowedPermission } from '@repo/ui/enums/permission';
import { IPermission } from '@repo/ui/types/permission';
import { IsString } from 'class-validator';
import { RolePermission } from '../../role/entities/rolePermission.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['module', 'feature'], { unique: true })
export class Permission extends BaseEntity implements IPermission {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ type: String, example: 'Users' })
  module: string;

  @Column()
  @IsString()
  @ApiProperty({ type: String, example: 'Users' })
  feature: string;

  @Column({
    type: 'enum',
    enum: AllowedPermission,
    array: true,
    default: [],
  })
  @ApiProperty({
    example: Object.values(AllowedPermission),
    enum: AllowedPermission,
    isArray: true,
    enumName: 'AllowedPermission',
    description: 'Allowed Permissions',
  })
  allowedPermissions: AllowedPermission[];

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  @ApiProperty({
    type: () => RolePermission,
    isArray: true,
  })
  rolePermissions: RolePermission[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-02-02T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-02-02T00:00:00.000Z' })
  updatedAt: Date;
}
