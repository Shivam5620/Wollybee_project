import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNumber, IsNumberString, IsString, MinLength } from 'class-validator';
import { IUser } from '../types/user';
import { GetRoleDto } from './role.dto';

export class CreateUserDto
  implements
    Omit<
      IUser,
      | 'id'
      | 'salt'
      | 'role'
      | 'isActive'
      | 'isDeleted'
      | 'createdAt'
      | 'updatedAt'
    >
{
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email of the user',
    required: true,
  })
  email: string;

  @IsString()
  @IsNumberString()
  @ApiProperty({
    example: '9876543210',
    description: 'Mobile number of the user',
    required: true,
  })
  mobile: string;

  @IsString()
  @MinLength(8)
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message:
  //       'Password must contain at least 1 uppercase letter, lowercase letter, number and special character',
  //   },6
  // )
  @ApiProperty({
    example: '<password>',
    description: 'Password of the user',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 1,
    description: 'Role of the user',
    required: true,
  })
  @IsInt()
  roleId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
