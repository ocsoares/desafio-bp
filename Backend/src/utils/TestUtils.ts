import { UserResponse } from "../modules/user/responses/UserResponse";
import { UserEntity } from "../entity/UserEntity";

export class TestUtils {
    static userBodyData(): UserEntity {
        return new UserEntity("Teste", "teste@gmail.com", "teste123");
    }

    static toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }
}
