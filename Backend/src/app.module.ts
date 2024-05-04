import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { PrismaDatabaseModule } from "./repositories/implementations/prisma/prisma-database.module";
import { BcryptHasherModule } from "./cryptography/implementations/bcrypt/bcrypt-hasher.module";
import { ProductModule } from "./modules/product/product.module";
import { UserProductModule } from "./modules/user-product/user-product.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        PrismaDatabaseModule,
        BcryptHasherModule,
        UserModule,
        ProductModule,
        UserProductModule,
    ],
})
export class AppModule {}
