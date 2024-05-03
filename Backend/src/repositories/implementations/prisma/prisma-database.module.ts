import { Global, Module } from "@nestjs/common";
import { UserRepository } from "../../abstracts/UserRepository";
import { PrismaService } from "./prisma-client.service";
import { PrismaUserRepository } from "./user/PrismaUserRepository";
import { ProductRepository } from "src/repositories/abstracts/ProductRepository";
import { PrismaProductRepository } from "./product/PrismaProductRepository";

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
    ],
    exports: [UserRepository, ProductRepository],
})
export class PrismaDatabaseModule {}
