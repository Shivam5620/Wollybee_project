import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
  ) {}

  create(createConfigurationDto: CreateConfigurationDto) {
    const configuration = this.configurationRepository.create(
      createConfigurationDto,
    );

    return this.configurationRepository.save(configuration);
  }

  findAll(options?: FindManyOptions<Configuration>) {
    return this.configurationRepository.find(options);
  }

  async update(id: number, updateConfigurationDto: UpdateConfigurationDto) {
    const updated = await this.configurationRepository.update(
      { id },
      updateConfigurationDto,
    );

    if (updated.affected === 0) {
      throw new NotFoundException('Configuration not found');
    }

    return this.configurationRepository.findOne({ where: { id } });
  }
}
