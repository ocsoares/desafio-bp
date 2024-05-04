import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserProductsService } from "./find-all-user-products.service";

describe("FindAllUserProductsService", () => {
    let service: FindAllUserProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FindAllUserProductsService],
        }).compile();

        service = module.get<FindAllUserProductsService>(
            FindAllUserProductsService,
        );
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
