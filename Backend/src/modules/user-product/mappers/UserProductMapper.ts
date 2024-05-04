import { UserProductResponse } from "../responses/UserProductResponse";
import { ProductResponse } from "src/modules/product/responses/ProductResponse";
import { UserResponse } from "src/modules/user/responses/UserResponse";
import { UserProductEntity } from "src/entity/UserProductEntity";

export class UserProductMapper {
    toResponse(userProductEntity: UserProductEntity): UserProductResponse {
        const userResponse = new UserResponse(
            userProductEntity.userEntity.fullName,
            userProductEntity.userEntity.email,
        );

        const productResponse = new ProductResponse(
            userProductEntity.productEntity.name,
            userProductEntity.productEntity.brand,
            userProductEntity.productEntity.price,
        );

        return new UserProductResponse(userResponse, productResponse);
    }
}
