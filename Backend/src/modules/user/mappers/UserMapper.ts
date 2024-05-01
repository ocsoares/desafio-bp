import { UserEntity } from "src/entity/UserEntity";
import { UserResponse } from "src/modules/user/responses/UserResponse";

export class UserMapper {
    toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }

    toResponseList(userEntityArray: UserEntity[]): UserResponse[] {
        return userEntityArray.map((user) => this.toResponse(user));
    }
}
