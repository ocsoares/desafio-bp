import { UserEntity } from "src/entity/UserEntity";
import { UserResponse } from "src/responses/UserResponse";

export class UserMapper {
    static toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }

    static toResponseList(userEntityArray: UserEntity[]): UserResponse[] {
        return userEntityArray.map((user) => this.toResponse(user));
    }
}
