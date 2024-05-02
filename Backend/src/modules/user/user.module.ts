import { Module } from "@nestjs/common";
import { CreateUserController } from "./use-cases/create-user/create-user.controller";
import { CreateUserService } from "./use-cases/create-user/create-user.service";
import { UserMapper } from "../../modules/user/mappers/UserMapper";

@Module({
    controllers: [CreateUserController],
    providers: [CreateUserService, UserMapper],
})
export class UserModule {}
