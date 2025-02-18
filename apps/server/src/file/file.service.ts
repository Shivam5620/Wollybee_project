import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import { S3Service } from '../aws/s3/s3.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    private readonly s3Service: S3Service,
  ) {}
  async create(createFileDto: CreateFileDto) {
    const uploadedFile = await this.s3Service.upload(
      createFileDto.file,
      createFileDto.type,
    );

    const file = this.fileRepository.create({
      ...createFileDto,
      name: createFileDto.file.originalname,
      path: uploadedFile.Key,
      url: uploadedFile.Location,
    });

    const savedFile = await this.fileRepository.save(file);
    return savedFile;
  }

  findAll(options: FindManyOptions<File> = {}) {
    return this.fileRepository.find(options);
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  findByIds(ids: number[]) {
    return this.fileRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    // Check if file exists
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) throw new NotFoundException('File not found');

    console.log('Found file:', file);

    // Upload file to S3
    const uploadedFile = await this.s3Service.upload(
      updateFileDto.file,
      updateFileDto.type,
    );

    console.log('Uploaded file:', uploadedFile);

    // Delete file from S3
    await this.s3Service.delete(file.path);

    console.log('File deleted:', file.path);

    await this.fileRepository.update(
      { id },
      {
        name: updateFileDto.file.originalname,
        type: updateFileDto.type,
        url: uploadedFile.Location,
        path: uploadedFile.Key,
      },
    );

    return await this.fileRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) throw new NotFoundException('File not found');

    // delete image from s3
    await this.s3Service.delete(file.path);

    return this.fileRepository.delete({ id });
  }
}
