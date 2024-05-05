import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { PrismaDatabaseModule } from "./repositories/implementations/prisma/prisma-database.module";
import { BcryptHasherModule } from "./cryptography/implementations/bcrypt/bcrypt-hasher.module";
import { ProductModule } from "./modules/product/product.module";
import { UserProductModule } from "./modules/user-product/user-product.module";
import { CacheModule } from "@nestjs/cache-manager";
import { RedisConfig } from "./config/RedisConfig";
import { redisStore } from "cache-manager-redis-yet";
import { RedisClientOptions } from "redis";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        CacheModule.register<RedisClientOptions>({
            isGlobal: true,
            ttl: RedisConfig.TTL(),
            store: redisStore,
            url: RedisConfig.url(),
        }),
        PrismaDatabaseModule,
        BcryptHasherModule,
        UserModule,
        ProductModule,
        UserProductModule,
    ],
})
export class AppModule {}
