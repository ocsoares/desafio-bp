import { Body, Controller, Post } from "@nestjs/common";
import { IController } from "src/interfaces/IController";
import { ProductResponse } from "../../responses/ProductResponse";
import { CreateProductService } from "./create-product.service";
import { CreateProductDTO } from "./dtos/CreateProductDTO";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from "@nestjs/swagger";

@Controller()
export class CreateProductController implements IController<ProductResponse> {
    constructor(private readonly createProductService: CreateProductService) {}

    @ApiTags("product")
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @ApiCreatedResponse()
    @Post("product")
    async handle(@Body() body: CreateProductDTO): Promise<ProductResponse> {
        return this.createProductService.execute(body);
    }
}
