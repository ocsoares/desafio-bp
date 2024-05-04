import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProductService } from './create-user-product.service';

describe('CreateUserProductService', () => {
  let service: CreateUserProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserProductService],
    }).compile();

    service = module.get<CreateUserProductService>(CreateUserProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
