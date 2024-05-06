import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserProductService } from "./create-user-product.service";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { ProductRepository } from "../../../../repositories/abstracts/ProductRepository";
import { UserProductRepository } from "../../../../repositories/abstracts/UserProductRepository";
import { UserProductMapper } from "../../mappers/UserProductMapper";
import { CreateUserProductTestUtils } from "../../../test/utils/CreateUserProductTestUtils";
import { UserNotFoundByIdException } from "../../../../exceptions/user/user-not-found-by-id.exception";
import { ProductNotFoundByIdException } from "../../../../exceptions/product/product-not-found-by-id.exception";

describe("CreateUserProductService", () => {
    let userRepository: UserRepository;
    let productRepository: ProductRepository;
    let userProductRepository: UserProductRepository;
    let userProductMapper: UserProductMapper;
    let createUserProductService: CreateUserProductService;

    const userId = CreateUserProductTestUtils.userId();
    const productId = CreateUserProductTestUtils.productId();
    const userEntity = CreateUserProductTestUtils.createUser();
    const productEntity = CreateUserProductTestUtils.createProduct();
    const userProductEntity = CreateUserProductTestUtils.createUserProduct();
    const userProductResponse = CreateUserProductTestUtils.toResponse();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProductService,
                {
                    provide: UserRepository,
                    useValue: {
                        create: jest.fn(),
                        findByEmail: jest.fn(),
                        findByCPF: jest.fn(),
                        findById: jest.fn(),
                    },
                },
                {
                    provide: ProductRepository,
                    useValue: {
                        create: jest.fn(),
                        findByHash: jest.fn(),
                        findById: jest.fn(),
                    },
                },
                {
                    provide: UserProductRepository,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                    },
                },
                {
                    provide: UserProductMapper,
                    useValue: {
                        toResponse: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get(UserRepository);
        productRepository = module.get(ProductRepository);
        userProductRepository = module.get(UserProductRepository);
        userProductMapper = module.get(UserProductMapper);
        createUserProductService = module.get<CreateUserProductService>(
            CreateUserProductService,
        );
    });

    it("should be defined", () => {
        expect(userRepository).toBeDefined();
        expect(productRepository).toBeDefined();
        expect(userProductRepository).toBeDefined();
        expect(userProductMapper).toBeDefined();
        expect(createUserProductService).toBeDefined();

        expect(userId).toBeDefined();
        expect(productId).toBeDefined();
        expect(userEntity).toBeDefined();
        expect(productEntity).toBeDefined();
        expect(userProductEntity).toBeDefined();
        expect(userProductResponse).toBeDefined();
    });

    it("It SHOULD NOT create a user product if user by id doesn't exists", async () => {
        await expect(
            createUserProductService.execute(userId, productId),
        ).rejects.toThrow(new UserNotFoundByIdException());

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(productRepository.findById).not.toHaveBeenCalledTimes(1);
    });

    it("It SHOULD NOT create a user product if product by id doesn't exists", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValue(userEntity);

        await expect(
            createUserProductService.execute(userId, productId),
        ).rejects.toThrow(new ProductNotFoundByIdException());

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(productRepository.findById).toHaveBeenCalledWith(productId);
        expect(userProductRepository.create).not.toHaveBeenCalledTimes(1);
    });

    it("It should be possible to create a user product", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValue(userEntity);
        jest.spyOn(productRepository, "findById").mockResolvedValue(
            productEntity,
        );

        jest.spyOn(userProductRepository, "create").mockResolvedValue(
            userProductEntity,
        );

        jest.spyOn(userProductMapper, "toResponse").mockReturnValue(
            userProductResponse,
        );

        const createdUserProduct = await createUserProductService.execute(
            userId,
            productId,
        );

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(productRepository.findById).toHaveBeenCalledWith(productId);
        expect(userProductRepository.create).toHaveBeenCalledWith(
            userId,
            productId,
        );
        expect(userProductMapper.toResponse).toHaveBeenCalledWith(
            userProductEntity,
        );
        expect(createdUserProduct).toEqual(userProductResponse);
    });
});
