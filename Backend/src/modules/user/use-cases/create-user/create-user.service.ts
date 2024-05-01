import { Injectable } from "@nestjs/common";
import { IService } from "../../../../interfaces/IService";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { UserAlreadyExistsByEmailException } from "../../../../exceptions/user-exceptions/user-already-exists-by-email.exception";
import { PasswordHasher } from "../../../../cryptography/abstracts/password-hasher";
import { UserResponse } from "../../../../modules/user/responses/UserResponse";
import { UserMapper } from "../../../../modules/user/mappers/UserMapper";

@Injectable()
export class CreateUserService
    implements IService<CreateUserDTO, UserResponse>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly userMapper: UserMapper,
    ) {}

    async execute(data: CreateUserDTO): Promise<UserResponse> {
        const userAlreadyExists = await this.userRepository.findByEmail(
            data.email,
        );

        if (userAlreadyExists) {
            throw new UserAlreadyExistsByEmailException();
        }

        const hashedPassword = await this.passwordHasher.hash(
            data.password,
            10,
        );

        const createdUser = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        return this.userMapper.toResponse(createdUser);
    }
}
