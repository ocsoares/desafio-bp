import { Body, Controller, Post } from "@nestjs/common";
import { IController } from "src/interfaces/IController";
import { ProductResponse } from "../../responses/ProductResponse";
import { CreateProductService } from "./create-product.service";
import { CreateProductDTO } from "./dtos/CreateProductDTO";

@Controller()
export class CreateProductController implements IController<ProductResponse> {
    constructor(private readonly createProductService: CreateProductService) {}

    @Post("product")
    async handle(@Body() body: CreateProductDTO): Promise<ProductResponse> {
        return this.createProductService.execute(body);
    }
}
