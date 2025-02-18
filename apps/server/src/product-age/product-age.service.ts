import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductAgeDto } from './dto/create-product-age.dto';
import { UpdateProductAgeDto } from './dto/update-product-age.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAge } from './entities/product-age.entity';
import { In, Repository } from 'typeorm';
import { FileService } from '../file/file.service';

const relations = ['file'];

@Injectable()
export class ProductAgeService {
  constructor(
    @InjectRepository(ProductAge)
    private productAgeRepository: Repository<ProductAge>,

    private readonly fileService: FileService,
  ) {}

  async create(createProductAgeDto: CreateProductAgeDto) {
    // get file from db
    const { fileId } = createProductAgeDto;
    const file = await this.fileService.findOne(fileId);

    // check if file exists
    if (!file) {
      throw new NotFoundException('File not found');
    }

    // create product age
    console.log('Creating product age with data:', createProductAgeDto);
    const productAge = this.productAgeRepository.create(createProductAgeDto);
    productAge.file = file;

    // save product age
    const savedProductAge = await this.productAgeRepository.save(productAge);
    console.log('Product Age saved:', savedProductAge);
    return savedProductAge;
  }

  findAll() {
    return this.productAgeRepository.find({ relations, order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const productAge = await this.productAgeRepository.findOne({
      where: { id },
      relations,
    });

    if (!productAge) {
      throw new NotFoundException('Product age not found');
    }

    return productAge;
  }

  findByIds(ids: number[]) {
    return this.productAgeRepository.find({ where: { id: In(ids) } });
  }

  async update(
    id: number,
    updateProductAgeDto: UpdateProductAgeDto,
  ): Promise<ProductAge> {
    // get product age from db
    const productAge = await this.productAgeRepository.findOne({
      where: { id },
    });

    // check if product age exists
    if (!productAge) throw new NotFoundException('Product age not found');

    // check if file exists
    const { fileId } = updateProductAgeDto;
    if (fileId) {
      const newFile = await this.fileService.findOne(fileId);

      // update product age with new file
      if (!newFile) {
        throw new BadRequestException('File not found');
      }
      productAge.file = newFile;
      delete updateProductAgeDto.fileId;
    }

    Object.assign(productAge, updateProductAgeDto);

    return await this.productAgeRepository.save(productAge);
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.productAgeRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException('Product age not found');
    }

    return;
  }
}
