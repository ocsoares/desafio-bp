import { UserEntity } from "../../../entity/UserEntity";
import { UserResponse } from "../../../modules/user/responses/UserResponse";

export class UserMapper {
    toResponse(userEntity: UserEntity): UserResponse {
        return new UserResponse(userEntity.fullName, userEntity.email);
    }
}
