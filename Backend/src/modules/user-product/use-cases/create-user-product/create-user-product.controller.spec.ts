import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProductController } from './create-user-product.controller';

describe('CreateUserProductController', () => {
  let controller: CreateUserProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserProductController],
    }).compile();

    controller = module.get<CreateUserProductController>(CreateUserProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
