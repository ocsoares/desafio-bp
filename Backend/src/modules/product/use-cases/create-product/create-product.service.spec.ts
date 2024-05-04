import { Test, TestingModule } from "@nestjs/testing";
import { CreateProductService } from "./create-product.service";
import { ProductRepository } from "../../../../repositories/abstracts/ProductRepository";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductUtils } from "./utils/ProductUtils";
import { ProductTestUtils } from "../../../../modules/test/utils/ProductTestUtils";
import { ProductAlreadyRegisteredByCompanyException } from "../../../../exceptions/product/product-already-registered-by-company.exception";

describe("CreateProductService", () => {
    let productRepository: ProductRepository;
    let productMapper: ProductMapper;
    let productUtils: ProductUtils;
    let createProductService: CreateProductService;

    const hashProduct = ProductTestUtils.generateHash();
    const testProduct = ProductTestUtils.createProduct();
    const productDTOData = ProductTestUtils.createProductDTOData();
    const productResponse = ProductTestUtils.toResponse();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProductService,
                {
                    provide: ProductRepository,
                    useValue: {
                        create: jest.fn(),
                        findByHash: jest.fn(),
                    },
                },
                {
                    provide: ProductMapper,
                    useValue: {
                        toResponse: jest.fn(),
                    },
                },
                {
                    provide: ProductUtils,
                    useValue: {
                        generateHash: jest.fn(),
                    },
                },
            ],
        }).compile();

        productRepository = module.get(ProductRepository);
        productMapper = module.get(ProductMapper);
        productUtils = module.get(ProductUtils);
        createProductService = module.get(CreateProductService);
    });

    it("should be defined", () => {
        expect(productRepository).toBeDefined();
        expect(productMapper).toBeDefined();
        expect(productUtils).toBeDefined();
        expect(createProductService).toBeDefined();

        expect(hashProduct).toBeDefined();
        expect(testProduct).toBeDefined();
        expect(productDTOData).toBeDefined();
        expect(productResponse).toBeDefined();
    });

    it("It SHOULD NOT be possible to create a product if it already exists by hash", async () => {
        (productUtils.generateHash as jest.Mock).mockReturnValue(hashProduct);

        jest.spyOn(productRepository, "findByHash").mockResolvedValue(
            testProduct,
        );

        await expect(createProductService.execute(testProduct)).rejects.toThrow(
            new ProductAlreadyRegisteredByCompanyException(),
        );

        expect(productUtils.generateHash).toHaveBeenCalledWith(testProduct);
        expect(productRepository.findByHash).toHaveBeenCalledWith(hashProduct);
        expect(productRepository.create).not.toHaveBeenCalledTimes(1);
    });

    it("It should be possible to create a product", async () => {
        (productUtils.generateHash as jest.Mock).mockReturnValue(hashProduct);

        jest.spyOn(productRepository, "create").mockResolvedValue(testProduct);

        jest.spyOn(productMapper, "toResponse").mockReturnValue(
            productResponse,
        );

        const createdProduct =
            await createProductService.execute(productDTOData);

        expect(productUtils.generateHash).toHaveBeenCalledWith(productDTOData);
        expect(productRepository.findByHash).toHaveBeenCalledWith(hashProduct);
        expect(productRepository.create).toHaveBeenCalledWith(
            productDTOData,
            hashProduct,
        );
        expect(productMapper.toResponse).toHaveBeenCalledWith(testProduct);
        expect(createdProduct).toEqual(productResponse);
    });
});
