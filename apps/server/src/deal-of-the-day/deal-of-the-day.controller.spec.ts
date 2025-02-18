import { Test, TestingModule } from '@nestjs/testing';
import { DealOfTheDayController } from './deal-of-the-day.controller';
import { DealOfTheDayService } from './deal-of-the-day.service';

describe('DealOfTheDayController', () => {
  let controller: DealOfTheDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealOfTheDayController],
      providers: [DealOfTheDayService],
    }).compile();

    controller = module.get<DealOfTheDayController>(DealOfTheDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
