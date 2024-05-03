import { Test } from "@nestjs/testing";
import { CreateUserController } from "./create-user.controller";
import { CreateUserService } from "./create-user.service";
import { UserTestDependenciesModule } from "../../../test/user-test-dependencies.module";
import { UserTestUtils } from "../../../../utils/UserTestUtils";

describe("CreateUserController", () => {
    let createUserController: CreateUserController;
    let createUserService: CreateUserService;

    const createUserDTOData = UserTestUtils.createUserDTOData();

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserTestDependenciesModule],
        }).compile();

        createUserController = moduleRef.get(CreateUserController);
        createUserService = moduleRef.get(CreateUserService);
    });

    it("should be defined", () => {
        expect(createUserController).toBeDefined();
        expect(createUserService).toBeDefined();
        expect(createUserDTOData).toBeDefined();
    });

    it("It should be possible to create a user", async () => {
        const userResponseData = UserTestUtils.toResponse(createUserDTOData);

        jest.spyOn(createUserService, "execute").mockResolvedValue(
            userResponseData,
        );

        const result = await createUserController.handle(createUserDTOData);

        expect(createUserService.execute).toHaveBeenCalledWith(
            createUserDTOData,
        );
        expect(result).toEqual(userResponseData);
    });
});
