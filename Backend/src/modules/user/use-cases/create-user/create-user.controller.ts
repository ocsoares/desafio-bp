import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserService } from "./create-user.service";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { IController } from "src/interfaces/IController";
import { UserResponse } from "src/responses/UserResponse";

@Controller()
export class CreateUserController implements IController<UserResponse> {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post("user")
    async handle(@Body() body: CreateUserDTO): Promise<UserResponse> {}
}