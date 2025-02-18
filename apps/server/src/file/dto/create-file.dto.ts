import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@repo/ui/enums/file';
import { IFile } from '@repo/ui/types/file';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto
  implements
    Omit<IFile, 'id' | 'name' | 'path' | 'url' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: FileType.banner,
    description: 'Type of the file',
    type: 'string',
    enum: FileType,
    required: true,
  })
  type: FileType;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
