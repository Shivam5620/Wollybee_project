import { Test, TestingModule } from '@nestjs/testing';
import { ProductInterestController } from './product-interest.controller';
import { ProductInterestService } from './product-interest.service';

describe('ProductInterestController', () => {
  let controller: ProductInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInterestController],
      providers: [ProductInterestService],
    }).compile();

    controller = module.get<ProductInterestController>(ProductInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
