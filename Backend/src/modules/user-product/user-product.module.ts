import { Module } from "@nestjs/common";
import { CreateUserProductController } from "./use-cases/create-user-product/create-user-product.controller";
import { CreateUserProductService } from "./use-cases/create-user-product/create-user-product.service";
import { UserProductMapper } from "./mappers/UserProductMapper";
import { FindAllUserProductsService } from "./use-cases/find-all-user-products/find-all-user-products.service";
import { FindAllUserProductsController } from "./use-cases/find-all-user-products/find-all-user-products.controller";

@Module({
    controllers: [CreateUserProductController, FindAllUserProductsController],
    providers: [
        CreateUserProductService,
        UserProductMapper,
        FindAllUserProductsService,
    ],
})
export class UserProductModule {}
