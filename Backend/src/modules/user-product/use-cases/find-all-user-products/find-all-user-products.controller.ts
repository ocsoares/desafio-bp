import { Controller, Get, Param } from "@nestjs/common";
import { IController } from "src/interfaces/IController";
import { ProductResponse } from "src/modules/product/responses/ProductResponse";
import { FindAllUserProductsService } from "./find-all-user-products.service";

@Controller()
export class FindAllUserProductsController
    implements IController<ProductResponse[]>
{
    constructor(
        private readonly findAllUserProductsService: FindAllUserProductsService,
    ) {}

    @Get("user/:userId")
    async handle(@Param("userId") userId: string): Promise<ProductResponse[]> {
        return await this.findAllUserProductsService.execute(userId);
    }
}
