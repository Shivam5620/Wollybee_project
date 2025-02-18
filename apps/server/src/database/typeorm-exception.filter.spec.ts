import { TypeOrmExceptionFilter } from './typeorm-exception.filter';

describe('TypeOrmExceptionFilter', () => {
  it('should be defined', () => {
    expect(new TypeOrmExceptionFilter()).toBeDefined();
  });
});
