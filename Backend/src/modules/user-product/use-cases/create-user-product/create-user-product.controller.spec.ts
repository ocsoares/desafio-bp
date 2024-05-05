import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserProductController } from "./create-user-product.controller";
import { CreateUserProductService } from "./create-user-product.service";
import { UserProductTestDependenciesModule } from "../../../../modules/test/user-product-test-dependencies.module";
import { CreateUserProductUtils } from "../../../../modules/test/utils/CreateUserProductUtils";

describe("CreateUserProductController", () => {
    let createUserProductService: CreateUserProductService;
    let createUserProductController: CreateUserProductController;

    const userId = CreateUserProductUtils.userId();
    const productId = CreateUserProductUtils.productId();
    const userProductResponse = CreateUserProductUtils.toResponse();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserProductTestDependenciesModule],
        }).compile();

        createUserProductService = module.get(CreateUserProductService);
        createUserProductController = module.get<CreateUserProductController>(
            CreateUserProductController,
        );
    });

    it("should be defined", () => {
        expect(createUserProductService).toBeDefined();
        expect(createUserProductController).toBeDefined();

        expect(userId).toBeDefined();
        expect(productId).toBeDefined();
        expect(userProductResponse).toBeDefined();
    });

    it("It should be possible to create a user product", async () => {
        jest.spyOn(createUserProductService, "execute").mockResolvedValue(
            userProductResponse,
        );

        const createdUserProduct = await createUserProductController.handle(
            userId,
            productId,
        );

        expect(createUserProductService.execute).toHaveBeenCalledWith(
            userId,
            productId,
        );
        expect(createdUserProduct).toEqual(userProductResponse);
    });
});
