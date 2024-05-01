import { Injectable } from "@nestjs/common";
import { IService } from "src/interfaces/IService";
import { UserRepository } from "src/repositories/abstracts/UserRepository";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { UserAlreadyExistsByEmailException } from "src/exceptions/user-exceptions/user-already-exists-by-email.exception";
import { PasswordHasher } from "src/cryptography/abstracts/password-hasher";
import { UserResponse } from "src/responses/UserResponse";
import { UserMapper } from "src/mappers/UserMapper";

@Injectable()
export class CreateUserService
    implements IService<CreateUserDTO, UserResponse>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) {}

    async execute(data: CreateUserDTO): Promise<UserResponse> {}
}
