import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserProductsController } from "./find-all-user-products.controller";
import { UserProductTestDependenciesModule } from "../../../../modules/test/user-product-test-dependencies.module";
import { FindAllUserProductsService } from "./find-all-user-products.service";
import { FindAllUserProductsTestUtils } from "../../../test/utils/FindAllUserProductsTestUtils";

describe("FindAllUserProductsController", () => {
    let findAllUserProductsService: FindAllUserProductsService;
    let findAllUserProductsController: FindAllUserProductsController;

    const userId = FindAllUserProductsTestUtils.userId();
    const productResponseArray =
        FindAllUserProductsTestUtils.productResponseArray();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserProductTestDependenciesModule],
        }).compile();

        findAllUserProductsService = module.get(FindAllUserProductsService);
        findAllUserProductsController =
            module.get<FindAllUserProductsController>(
                FindAllUserProductsController,
            );
    });

    it("should be defined", () => {
        expect(findAllUserProductsService).toBeDefined();
        expect(findAllUserProductsController).toBeDefined();

        expect(userId).toBeDefined();
        expect(productResponseArray).toBeDefined();
    });

    it("It should be possible to find all user products", async () => {
        jest.spyOn(findAllUserProductsService, "execute").mockResolvedValue(
            productResponseArray,
        );

        const allUserProducts =
            await findAllUserProductsController.handle(userId);

        expect(findAllUserProductsService.execute).toHaveBeenCalledWith(userId);
        expect(allUserProducts).toEqual(productResponseArray);
    });
});
