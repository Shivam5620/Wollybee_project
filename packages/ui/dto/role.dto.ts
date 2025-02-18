import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IRole } from '../types/role';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AllowedPermission } from '../enums/permission';

export class AssignPermissionDto {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'Permission Id',
    required: true,
  })
  permissionId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(AllowedPermission, { each: true })
  @ApiProperty({
    example: [AllowedPermission.CREATE, AllowedPermission.READ],
    description: 'Allowed Permissions',
    required: true,
  })
  allowedPermissions: AllowedPermission[];
}

export class CreateRoleDto
  implements
    Omit<IRole, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>
{
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty({
    example: 'SuperAdmin',
    description: 'Name of the role',
    required: true,
  })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsNotEmpty()
  @ApiProperty({
    example: 'Description',
    description: 'Description of the role',
    required: true,
  })
  description: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AssignPermissionDto)
  @ApiProperty({
    type: () => AssignPermissionDto,
    isArray: true,
    required: true,
  })
  permissions: AssignPermissionDto[];
}

export class GetRoleDto
  implements
    Omit<IRole, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    example: 'SuperAdmin',
    description: 'Name of the role',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Description',
    description: 'Description of the role',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: [
      { permissionId: 1, allowedPermissions: Object.values(AllowedPermission) },
    ],
    description: 'List of permissions assigned to the role',
    required: true,
  })
  permissions: AssignPermissionDto[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
