import { Module } from "@nestjs/common";
import { CreateProductController } from "./use-cases/create-product/create-product.controller";
import { CreateProductService } from "./use-cases/create-product/create-product.service";
import { ProductMapper } from "./mappers/ProductMapper";
import { ProductUtils } from "./use-cases/create-product/utils/ProductUtils";

@Module({
    controllers: [CreateProductController],
    providers: [CreateProductService, ProductMapper, ProductUtils],
})
export class ProductModule {}
