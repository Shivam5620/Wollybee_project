import { ApiProperty } from '@nestjs/swagger';
import { ISignInRequestBody } from '@repo/ui/types';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto implements ISignInRequestBody {
  @IsEmail()
  @ApiProperty({ example: 'prabal@wollybee.com', required: true })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234567890', required: true })
  password: string;
}
