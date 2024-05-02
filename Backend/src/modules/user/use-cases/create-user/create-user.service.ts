import { Injectable } from "@nestjs/common";
import { IService } from "../../../../interfaces/IService";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { UserAlreadyExistsByEmailException } from "../../../../exceptions/user-exceptions/user-already-exists-by-email.exception";
import { PasswordHasher } from "../../../../cryptography/abstracts/password-hasher";
import { UserResponse } from "../../../../modules/user/responses/UserResponse";
import { UserMapper } from "../../../../modules/user/mappers/UserMapper";
import { UserAlreadyExistsByCPFException } from "src/exceptions/user-exceptions/user-already-exists-by-cpf.exception";

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
        const userAlreadyExistsByEmail = await this.userRepository.findByEmail(
            data.email,
        );

        if (userAlreadyExistsByEmail) {
            throw new UserAlreadyExistsByEmailException();
        }

        const userAlreadyExistsByCPF = await this.userRepository.findByCPF(
            data.cpf,
        );

        if (userAlreadyExistsByCPF) {
            throw new UserAlreadyExistsByCPFException();
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
