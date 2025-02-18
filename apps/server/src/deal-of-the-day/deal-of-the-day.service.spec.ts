import { Test, TestingModule } from '@nestjs/testing';
import { DealOfTheDayService } from './deal-of-the-day.service';

describe('DealOfTheDayService', () => {
  let service: DealOfTheDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealOfTheDayService],
    }).compile();

    service = module.get<DealOfTheDayService>(DealOfTheDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
