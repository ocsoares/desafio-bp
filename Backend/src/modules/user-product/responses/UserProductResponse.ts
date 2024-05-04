import { ProductResponse } from "src/modules/product/responses/ProductResponse";
import { UserResponse } from "src/modules/user/responses/UserResponse";

export class UserProductResponse {
    constructor(
        public readonly userResponse: UserResponse,
        public readonly productResponse: ProductResponse,
    ) {}
}
