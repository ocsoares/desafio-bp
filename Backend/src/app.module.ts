import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { PrismaDatabaseModule } from "./repositories/implementations/prisma/prisma-database.module";
import { BcryptHasherModule } from "./cryptography/implementations/bcrypt/bcrypt-hasher.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        PrismaDatabaseModule,
        BcryptHasherModule,
        UserModule,
    ],
})
export class AppModule {}
