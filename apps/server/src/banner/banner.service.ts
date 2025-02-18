import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import { FileService } from '../file/file.service';

const relations = ['file', 'mobileFile'];

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,

    private readonly fileService: FileService,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    // get file from db
    const { fileId, mobileFileId } = createBannerDto;
    const files = await this.fileService.findAll({
      where: { id: In([fileId, mobileFileId]) },
    });

    const file = files.find((file) => file.id === fileId);
    const mobileFile = files.find((file) => file.id === mobileFileId);

    // check if file exists
    if (!file || !mobileFile) {
      throw new NotFoundException('File not found');
    }

    // create banner
    console.log('Creating banner with data:', createBannerDto);
    const banner = this.bannerRepository.create(createBannerDto);
    banner.file = file;
    banner.mobileFile = mobileFile;

    // save banner
    const savedBanner = await this.bannerRepository.save(banner);
    console.log('Banner saved:', savedBanner);
    return savedBanner;
  }

  findAll(options?: FindManyOptions<Banner>) {
    return this.bannerRepository.find({
      relations,
      ...options,
    });
  }

  findOne(id: number) {
    return this.bannerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    // get banner from db
    const banner = await this.bannerRepository.findOne({
      where: { id },
      relations,
    });

    // check if banner exists
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    // check if file exists
    const { fileId, mobileFileId } = updateBannerDto;

    if (fileId) {
      const newFile = await this.fileService.findOne(fileId);

      if (!newFile) {
        throw new BadRequestException('File not found');
      }

      // update banner with new file
      banner.file = newFile;

      delete updateBannerDto.fileId;
    }

    if (mobileFileId) {
      const newFile = await this.fileService.findOne(mobileFileId);

      if (!newFile) {
        throw new BadRequestException('File not found');
      }

      // update banner with new file
      banner.mobileFile = newFile;

      delete updateBannerDto.mobileFileId;
    }

    // Update banner fields
    Object.assign(banner, updateBannerDto);

    // update banner
    return await this.bannerRepository.save(banner);
  }

  async remove(id: number) {
    // delete banner from db
    const deleted = await this.bannerRepository.delete({ id });

    // check if banner exists
    if (deleted.affected === 0) {
      throw new NotFoundException('Banner not found');
    }

    return;
  }
}
