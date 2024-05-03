import { UserResponse } from "../modules/user/responses/UserResponse";
import { UserEntity } from "../entity/UserEntity";
import { CreateUserDTO } from "src/modules/user/use-cases/create-user/dtos/CreateUserDTO";

export class UserTestUtils {
    static userBodyData(): UserEntity {
        return new UserEntity(
            "Teste Testando",
            "teste@gmail.com",
            "434.908.328-68",
            "teste123",
        );
    }

    static toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }

    static createUserDTOData(): CreateUserDTO {
        const data: CreateUserDTO = {
            fullName: "John Doe",
            email: "john@example.com",
            cpf: "891.920.978-20",
            password: "password123",
        };

        return data;
    }
}
