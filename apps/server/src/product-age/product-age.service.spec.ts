import { Test, TestingModule } from '@nestjs/testing';
import { ProductAgeService } from './product-age.service';

describe('ProductAgeService', () => {
  let service: ProductAgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAgeService],
    }).compile();

    service = module.get<ProductAgeService>(ProductAgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
