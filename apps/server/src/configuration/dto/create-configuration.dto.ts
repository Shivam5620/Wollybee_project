import { ApiProperty } from '@nestjs/swagger';
import { ConfigurationType } from '@repo/ui/enums/configuration';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'FEEDBACK_OPTIONS',
    description: 'Key of the configuration',
    type: 'string',
    required: true,
  })
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Used to set the options in feedback',
    description: 'Description of the configuration',
    type: 'string',
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: ConfigurationType.STRING_ARRAY,
    description: 'Type of the banner',
    type: 'string',
    enum: ConfigurationType,
    required: true,
  })
  type: ConfigurationType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '["I want to add or modify items in my cart"]',
    description: 'Value of the configuration',
    type: 'string',
    required: true,
  })
  value: string;
}
