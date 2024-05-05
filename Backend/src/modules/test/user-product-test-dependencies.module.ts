import { Module } from "@nestjs/common";
import { ProductRepository } from "../../repositories/abstracts/ProductRepository";
import { PrismaService } from "../../repositories/implementations/prisma/prisma-client.service";
import { PrismaProductRepository } from "../../repositories/implementations/prisma/product/PrismaProductRepository";
import { CreateUserProductService } from "../user-product/use-cases/create-user-product/create-user-product.service";
import { CreateUserProductController } from "../user-product/use-cases/create-user-product/create-user-product.controller";
import { UserProductMapper } from "../user-product/mappers/UserProductMapper";
import { PrismaUserRepository } from "../../repositories/implementations/prisma/user/PrismaUserRepository";
import { UserRepository } from "../../repositories/abstracts/UserRepository";
import { PrismaUserProductRepository } from "../../repositories/implementations/prisma/user-product/PrismaUserProductRepository";
import { UserProductRepository } from "../../repositories/abstracts/UserProductRepository";
import { FindAllUserProductsService } from "../user-product/use-cases/find-all-user-products/find-all-user-products.service";
import { FindAllUserProductsController } from "../user-product/use-cases/find-all-user-products/find-all-user-products.controller";
import { ProductMapper } from "../product/mappers/ProductMapper";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Module({
    providers: [
        CreateUserProductService,
        CreateUserProductController,
        FindAllUserProductsService,
        FindAllUserProductsController,
        UserProductMapper,
        ProductMapper,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository,
        },
        {
            provide: UserProductRepository,
            useClass: PrismaUserProductRepository,
        },
        PrismaService,
        {
            provide: CACHE_MANAGER,
            useValue: {
                get: jest.fn(),
                set: jest.fn(),
                del: jest.fn(),
            },
        },
    ],
    exports: [
        CreateUserProductService,
        CreateUserProductController,
        UserProductMapper,
        UserRepository,
        ProductRepository,
        UserProductRepository,
        PrismaService,
    ],
})
export class UserProductTestDependenciesModule {}
