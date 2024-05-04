import { Controller, Param, Post } from "@nestjs/common";
import { IController } from "src/interfaces/IController";
import { CreateUserProductService } from "./create-user-product.service";
import { UserProductResponse } from "../../responses/UserProductResponse";

@Controller()
export class CreateUserProductController
    implements IController<UserProductResponse>
{
    constructor(
        private readonly createUserProductService: CreateUserProductService,
    ) {}

    @Post("user/:userId/product/:productId")
    async handle(
        @Param("userId") userId: string,
        @Param("productId") productId: string,
    ): Promise<UserProductResponse> {
        return await this.createUserProductService.execute(userId, productId);
    }
}
