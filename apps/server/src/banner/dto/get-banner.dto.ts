import { ApiPropertyOptional } from '@nestjs/swagger';
import { BannerType } from '@repo/ui/enums/banner';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IGetBannersQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'type',
    example: BannerType.home,
    enum: BannerType,
    enumName: 'BannerType',
    description: 'Page for which banners should be fetched',
  })
  type: BannerType;
}
