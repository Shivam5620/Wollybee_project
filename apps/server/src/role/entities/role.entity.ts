import { IRole } from '@repo/ui/types/role';
import { User } from '../../user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolePermission } from './rolePermission.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role extends BaseEntity implements IRole {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ type: String, example: 'admin' })
  name: string;

  @Column({ default: '' })
  @ApiProperty({ type: String, example: 'Administrator' })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @ApiProperty({ type: [RolePermission] })
  rolePermissions: RolePermission[];

  @ManyToOne(() => User)
  createdBy: number;

  @ManyToOne(() => User)
  updatedBy: number;

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
