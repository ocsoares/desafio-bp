import { UserEntity } from "src/entity/UserEntity";
import { CreateUserDTO } from "src/modules/user/use-cases/create-user/dtos/CreateUserDTO";

export abstract class UserRepository {
    abstract create(data: CreateUserDTO): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findByCPF(cpf: string): Promise<UserEntity | null>;
    abstract findById(id: string): Promise<UserEntity | null>;
}
