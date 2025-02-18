import { Test, TestingModule } from '@nestjs/testing';
import { ProductInterestService } from './product-interest.service';

describe('ProductInterestService', () => {
  let service: ProductInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInterestService],
    }).compile();

    service = module.get<ProductInterestService>(ProductInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
