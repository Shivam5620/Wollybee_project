import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductInterestDto } from './dto/create-product-interest.dto';
import { UpdateProductInterestDto } from './dto/update-product-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInterest } from './entities/product-interest.entity';
import { In, Repository } from 'typeorm';
import { FileService } from '../file/file.service';

const relations = ['file'];

@Injectable()
export class ProductInterestService {
  constructor(
    @InjectRepository(ProductInterest)
    private productInterestRepository: Repository<ProductInterest>,

    private readonly fileService: FileService,
  ) {}

  async create(createProductInterestDto: CreateProductInterestDto) {
    // get file from db
    const { fileId } = createProductInterestDto;
    const file = await this.fileService.findOne(fileId);

    // check if file exists
    if (!file) {
      throw new NotFoundException('File not found');
    }

    // create product interest
    console.log(
      'Creating product interest with data:',
      createProductInterestDto,
    );
    const productInterest = this.productInterestRepository.create(
      createProductInterestDto,
    );
    productInterest.file = file;

    // save product interest
    const savedProductInterest =
      await this.productInterestRepository.save(productInterest);
    console.log('Product Interest saved:', savedProductInterest);
    return savedProductInterest;
  }

  findAll() {
    return this.productInterestRepository.find({ relations });
  }

  async findOne(id: number) {
    const productInterest = await this.productInterestRepository.findOne({
      where: { id },
      relations,
    });

    if (!productInterest) {
      throw new NotFoundException('Product interest not found');
    }

    return productInterest;
  }

  findByIds(ids: number[]) {
    return this.productInterestRepository.find({ where: { id: In(ids) } });
  }

  async update(
    id: number,
    updateProductInterestDto: UpdateProductInterestDto,
  ): Promise<ProductInterest> {
    // get product interest from db
    const productInterest = await this.productInterestRepository.findOne({
      where: { id },
    });

    // check if product interest exists
    if (!productInterest)
      throw new NotFoundException('Product interest not found');

    // check if file exists
    const { fileId } = updateProductInterestDto;
    if (fileId) {
      const newFile = await this.fileService.findOne(fileId);

      // update product interest with new file
      if (!newFile) {
        throw new BadRequestException('File not found');
      }
      productInterest.file = newFile;
      delete updateProductInterestDto.fileId;
    }

    Object.assign(productInterest, updateProductInterestDto);

    return await this.productInterestRepository.save(productInterest);
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.productInterestRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException('Product interest not found');
    }

    return;
  }
}
