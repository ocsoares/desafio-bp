import { Module } from "@nestjs/common";
import { CreateUserService } from "../user/use-cases/create-user/create-user.service";
import { UserMapper } from "../user/mappers/UserMapper";
import { UserRepository } from "../../repositories/abstracts/UserRepository";
import { PrismaUserRepository } from "../../repositories/implementations/prisma/user/PrismaUserRepository";
import { PrismaService } from "../../repositories/implementations/prisma/prisma-client.service";
import { PasswordHasher } from "../../cryptography/abstracts/password-hasher";
import { BcryptHasher } from "../../cryptography/implementations/bcrypt/bcrypt-hasher";
import { CreateUserController } from "../user/use-cases/create-user/create-user.controller";

@Module({
    providers: [
        CreateUserService,
        CreateUserController,
        UserMapper,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: PasswordHasher,
            useClass: BcryptHasher,
        },
        PrismaService,
    ],
    exports: [
        CreateUserService,
        CreateUserController,
        UserMapper,
        UserRepository,
        PasswordHasher,
        PrismaService,
    ],
})
export class UserTestDependenciesModule {}
