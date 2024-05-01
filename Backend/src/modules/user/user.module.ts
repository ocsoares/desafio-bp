import { Module } from "@nestjs/common";
import { CreateUserController } from "./use-cases/create-user/create-user.controller";
import { CreateUserService } from "./use-cases/create-user/create-user.service";

@Module({
    controllers: [CreateUserController],
    providers: [CreateUserService],
})
export class UserModule {}
