import { Global, Module } from "@nestjs/common";
import { UserRepository } from "../../abstracts/UserRepository";
import { PrismaService } from "./prisma-client.service";
import { PrismaUserRepository } from "./user/PrismaUserRepository";
import { ProductRepository } from "../../../repositories/abstracts/ProductRepository";
import { PrismaProductRepository } from "./product/PrismaProductRepository";
import { UserProductRepository } from "../../../repositories/abstracts/UserProductRepository";
import { PrismaUserProductRepository } from "./user-product/PrismaUserProductRepository";

@Global()
@Module({
    providers: [
        PrismaService,
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
    ],
    exports: [UserRepository, ProductRepository, UserProductRepository],
})
export class PrismaDatabaseModule {}
