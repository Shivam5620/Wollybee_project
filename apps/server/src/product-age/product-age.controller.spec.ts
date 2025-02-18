import { Test, TestingModule } from '@nestjs/testing';
import { ProductAgeController } from './product-age.controller';
import { ProductAgeService } from './product-age.service';

describe('ProductAgeController', () => {
  let controller: ProductAgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAgeController],
      providers: [ProductAgeService],
    }).compile();

    controller = module.get<ProductAgeController>(ProductAgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
