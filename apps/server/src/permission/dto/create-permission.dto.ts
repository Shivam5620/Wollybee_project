import { ApiProperty } from '@nestjs/swagger';
import { AllowedPermission } from '@repo/ui/enums/permission';
import { IPermission } from '@repo/ui/types/permission';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePermissionDto
  implements
    Omit<IPermission, 'id' | 'createdAt' | 'updatedAt' | 'allowedPermissions'>
{
  @ApiProperty({
    description: 'Module name',
    example: 'Product',
  })
  @IsString()
  @IsNotEmpty()
  module: string;

  @ApiProperty({
    description: 'Feature name',
    example: 'Product',
  })
  @IsString()
  @IsNotEmpty()
  feature: string;

  @ApiProperty({
    description: 'Allowed Permissions',
    example: Object.values(AllowedPermission),
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(AllowedPermission, { each: true })
  allowedPermissions: AllowedPermission[];
}
