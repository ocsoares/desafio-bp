import { Module } from "@nestjs/common";
import { PrismaService } from "../../repositories/implementations/prisma/prisma-client.service";
import { CreateProductService } from "../product/use-cases/create-product/create-product.service";
import { CreateProductController } from "../product/use-cases/create-product/create-product.controller";
import { ProductRepository } from "../../repositories/abstracts/ProductRepository";
import { PrismaProductRepository } from "../../repositories/implementations/prisma/product/PrismaProductRepository";
import { ProductMapper } from "../product/mappers/ProductMapper";
import { ProductUtils } from "../product/use-cases/create-product/utils/ProductUtils";

@Module({
    providers: [
        CreateProductService,
        CreateProductController,
        ProductMapper,
        ProductUtils,
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository,
        },
        PrismaService,
    ],
    exports: [
        CreateProductService,
        CreateProductController,
        ProductMapper,
        ProductRepository,
        PrismaService,
    ],
})
export class ProductTestDependenciesModule {}
