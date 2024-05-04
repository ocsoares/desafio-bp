import { Module } from "@nestjs/common";
import { CreateUserProductController } from "./use-cases/create-user-product/create-user-product.controller";
import { CreateUserProductService } from "./use-cases/create-user-product/create-user-product.service";
import { UserProductMapper } from "./mappers/UserProductMapper";

@Module({
    controllers: [CreateUserProductController],
    providers: [CreateUserProductService, UserProductMapper],
})
export class UserProductModule {}
