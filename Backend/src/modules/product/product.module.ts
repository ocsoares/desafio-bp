import { Module } from "@nestjs/common";
import { CreateProductController } from "./use-cases/create-product/create-product.controller";
import { CreateProductService } from "./use-cases/create-product/create-product.service";

@Module({
    controllers: [CreateProductController],
    providers: [CreateProductService],
})
export class ProductModule {}
