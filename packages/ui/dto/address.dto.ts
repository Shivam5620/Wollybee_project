import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IAddress } from '../types/address';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { AddressType } from '../enums/address';

export class CreateAddressDto implements Partial<IAddress> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'John Doe' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '123 Main St' })
  addressLine1: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'Suite 23', required: false })
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Indore' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Madhya Pradesh' })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'India' })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '452001' })
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '9876543210' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Any additional instructions',
    required: false,
  })
  additionalInstructions?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, example: false, required: false })
  isDefault: boolean;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'example@gmail.com' })
  email: string;

  @IsEnum(AddressType)
  @IsNotEmpty()
  @ApiProperty({ type: String, enum: AddressType, example: AddressType.HOME })
  type: AddressType;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
