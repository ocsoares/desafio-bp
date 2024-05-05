import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserProductsService } from "./find-all-user-products.service";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { UserProductRepository } from "../../../../repositories/abstracts/UserProductRepository";
import { ProductMapper } from "../../../../modules/product/mappers/ProductMapper";
import { FindAllUserProductsUtils } from "../../../../modules/test/utils/FindAllUserProductsUtils";
import { UserNotFoundByIdException } from "../../../../exceptions/user/user-not-found-by-id.exception";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

describe("FindAllUserProductsService", () => {
    let userRepository: UserRepository;
    let userProductRepository: UserProductRepository;
    let productMapper: ProductMapper;
    let cache: Cache;
    let findAllUserProductsService: FindAllUserProductsService;

    const userId = FindAllUserProductsUtils.userId();
    const userEntity = FindAllUserProductsUtils.createUser();
    const productEntityArray = FindAllUserProductsUtils.createProductArray();
    const productResponseArray =
        FindAllUserProductsUtils.productResponseArray();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllUserProductsService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByEmail: jest.fn(),
                        findByCPF: jest.fn(),
                        create: jest.fn(),
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
                    provide: ProductMapper,
                    useValue: {
                        toResponse: jest.fn(),
                        toResponseArray: jest.fn(),
                    },
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                        del: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get(UserRepository);
        userProductRepository = module.get(UserProductRepository);
        productMapper = module.get(ProductMapper);
        cache = module.get(CACHE_MANAGER);
        findAllUserProductsService = module.get<FindAllUserProductsService>(
            FindAllUserProductsService,
        );
    });

    it("should be defined", () => {
        expect(userRepository).toBeDefined();
        expect(userProductRepository).toBeDefined();
        expect(productMapper).toBeDefined();
        expect(cache).toBeDefined();
        expect(findAllUserProductsService).toBeDefined();

        expect(userId).toBeDefined();
        expect(userEntity).toBeDefined();
        expect(productEntityArray).toBeDefined();
        expect(productResponseArray).toBeDefined();
    });

    it("It SHOULD NOT be possible to find all user products if user by id doesn't exists", async () => {
        await expect(
            findAllUserProductsService.execute(userId),
        ).rejects.toThrow(new UserNotFoundByIdException());

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(cache.get).not.toHaveBeenCalledTimes(1);
    });

    it("It should be possible to find all user products if there is cached data", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValue(userEntity);
        jest.spyOn(cache, "get").mockResolvedValue(productResponseArray);

        const allUserProducts =
            await findAllUserProductsService.execute(userId);

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(cache.get).toHaveBeenCalledWith(expect.any(String));
        expect(userProductRepository.findAll).not.toHaveBeenCalledTimes(1);
        expect(allUserProducts).toEqual(productResponseArray);
    });

    it("It should be possible to find all user products if THERE IS NO cached data", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValue(userEntity);
        jest.spyOn(userProductRepository, "findAll").mockResolvedValue(
            productEntityArray,
        );

        (productMapper.toResponseArray as jest.Mock).mockReturnValue(
            productResponseArray,
        );

        jest.spyOn(cache, "set").mockResolvedValue(undefined);

        const allUserProducts =
            await findAllUserProductsService.execute(userId);

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(cache.get).toHaveBeenCalledWith(expect.any(String));
        expect(userProductRepository.findAll).toHaveBeenCalledWith(userId);
        expect(productMapper.toResponseArray).toHaveBeenCalledWith(
            productEntityArray,
        );
        expect(cache.set).toHaveBeenCalledWith(
            expect.any(String),
            productResponseArray,
        );
        expect(allUserProducts).toEqual(productResponseArray);
    });
});
