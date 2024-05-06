import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserService } from "./create-user.service";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { IController } from "src/interfaces/IController";
import { UserResponse } from "src/modules/user/responses/UserResponse";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from "@nestjs/swagger";

@Controller()
export class CreateUserController implements IController<UserResponse> {
    constructor(private readonly createUserService: CreateUserService) {}

    @ApiTags("user")
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @ApiCreatedResponse()
    @Post("user")
    async handle(@Body() body: CreateUserDTO): Promise<UserResponse> {
        const createdUser = await this.createUserService.execute(body);

        return createdUser;
    }
}
