import { Module } from "@nestjs/common";
import { CreateUserProductController } from "./use-cases/create-user-product/create-user-product.controller";
import { CreateUserProductService } from "./use-cases/create-user-product/create-user-product.service";

@Module({
    controllers: [CreateUserProductController],
    providers: [CreateUserProductService],
})
export class UserProductModule {}
