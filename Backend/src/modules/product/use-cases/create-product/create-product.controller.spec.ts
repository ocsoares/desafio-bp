import { Test, TestingModule } from "@nestjs/testing";
import { CreateProductController } from "./create-product.controller";
import { ProductTestDependenciesModule } from "../../../../modules/test/product-test-dependencies.module";
import { CreateProductService } from "./create-product.service";
import { ProductTestUtils } from "../../../../modules/test/utils/ProductTestUtils";

describe("CreateProductController", () => {
    let createProductController: CreateProductController;
    let createProductService: CreateProductService;

    const productDTOData = ProductTestUtils.createProductDTOData();
    const productResponse = ProductTestUtils.toResponse();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ProductTestDependenciesModule],
        }).compile();

        createProductController = module.get(CreateProductController);
        createProductService = module.get(CreateProductService);
    });

    it("should be defined", () => {
        expect(createProductController).toBeDefined();
        expect(createProductService).toBeDefined();
        expect(productDTOData).toBeDefined();
        expect(productResponse).toBeDefined();
    });

    it("It should be possible to create a product", async () => {
        jest.spyOn(createProductService, "execute").mockResolvedValue(
            productResponse,
        );

        const createdProduct =
            await createProductService.execute(productDTOData);

        expect(createProductService.execute).toHaveBeenCalledWith(
            productDTOData,
        );
        expect(createdProduct).toEqual(productResponse);
    });
});
