import { ApiProperty } from '@nestjs/swagger';
import { BannerType } from '@repo/ui/enums/banner';
import { IBanner } from '@repo/ui/types';
import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBannerDto
  implements
    Omit<IBanner, 'file' | 'mobileFile' | 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Home',
    description: 'Title of the banner',
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Description',
    description: 'Description of the banner',
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: BannerType.home,
    description: 'Type of the banner',
    type: 'string',
    enum: BannerType,
    required: true,
  })
  type: BannerType;

  @ApiProperty({
    example: 1,
    description: 'Image of the banner',
    required: true,
  })
  @IsInt()
  fileId: number;

  @ApiProperty({
    example: 1,
    description: 'Image of the banner for mobile',
    required: true,
  })
  @IsInt()
  mobileFileId: number;

  @Matches(/^\/.*/, {
    message: 'URL must start with a forward slash (/)',
  })
  @ApiProperty({
    example: '/product/20',
    description: 'URL link associated with the banner',
    required: true,
  })
  url: string;
}
