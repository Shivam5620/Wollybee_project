import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create(createTestimonialDto);
    return this.testimonialRepository.save(testimonial);
  }

  findAll(): Promise<Testimonial[]> {
    return this.testimonialRepository.find();
  }

  findOne(id: number): Promise<Testimonial> {
    return this.testimonialRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTestimonialDto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    await this.testimonialRepository.update(id, updateTestimonialDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.testimonialRepository.delete(id);
  }
}
