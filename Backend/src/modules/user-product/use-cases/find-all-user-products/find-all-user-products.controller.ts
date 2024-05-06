import { Controller, Get, Param } from "@nestjs/common";
import { IController } from "src/interfaces/IController";
import { ProductResponse } from "src/modules/product/responses/ProductResponse";
import { FindAllUserProductsService } from "./find-all-user-products.service";
import {
    ApiTags,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
} from "@nestjs/swagger";

@Controller()
export class FindAllUserProductsController
    implements IController<ProductResponse[]>
{
    constructor(
        private readonly findAllUserProductsService: FindAllUserProductsService,
    ) {}

    @ApiTags("user-product")
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @ApiOkResponse()
    @Get("user/:userId")
    async handle(@Param("userId") userId: string): Promise<ProductResponse[]> {
        return await this.findAllUserProductsService.execute(userId);
    }
}
