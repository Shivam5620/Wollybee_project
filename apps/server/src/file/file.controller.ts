import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { File } from './entities/file.entity';

@ApiBearerAuth()
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFileDto })
  @ApiOkResponse({ type: File })
  create(
    @UploadedFile()
    file: Express.Multer.File,

    @Body(ValidationPipe) createFileDto: CreateFileDto,
  ) {
    createFileDto.file = file;
    return this.fileService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiOkResponse({ type: File, isArray: true })
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by id' })
  @ApiOkResponse({ type: File })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update file' })
  @ApiBody({ type: UpdateFileDto })
  @ApiOkResponse({ type: File })
  update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateFileDto: UpdateFileDto,
  ) {
    updateFileDto.file = file;
    return this.fileService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.remove(id);
  }
}
