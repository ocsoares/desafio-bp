import { UserResponse } from "../modules/user/responses/UserResponse";
import { UserEntity } from "../entity/UserEntity";
import { CreateUserDTO } from "src/modules/user/use-cases/create-user/dtos/CreateUserDTO";

export class TestUtils {
    static userBodyData(): UserEntity {
        return new UserEntity("Teste", "teste@gmail.com", "teste123");
    }

    static toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }

    static createUserDTOData(): CreateUserDTO {
        const data: CreateUserDTO = {
            fullName: "John Doe",
            email: "john@example.com",
            password: "password123",
        };

        return data;
    }
}
