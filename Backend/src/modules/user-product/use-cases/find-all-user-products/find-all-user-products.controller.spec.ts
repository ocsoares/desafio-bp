import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserProductsController } from "./find-all-user-products.controller";

describe("FindAllUserProductsController", () => {
    let controller: FindAllUserProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FindAllUserProductsController],
        }).compile();

        controller = module.get<FindAllUserProductsController>(
            FindAllUserProductsController,
        );
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
