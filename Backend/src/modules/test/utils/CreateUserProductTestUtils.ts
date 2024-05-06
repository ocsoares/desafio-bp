import { UserProductResponse } from "../../user-product/responses/UserProductResponse";
import { ProductEntity } from "../../../entity/ProductEntity";
import { UserEntity } from "../../../entity/UserEntity";
import { UserProductEntity } from "../../../entity/UserProductEntity";
import { UserResponse } from "../../user/responses/UserResponse";
import { ProductResponse } from "../../product/responses/ProductResponse";

export class CreateUserProductTestUtils {
    static userId(): string {
        return "4190c3e171e51692556e";
    }

    static productId(): string {
        return "2d57f6b1e8deebdafb6f";
    }

    static createUser(): UserEntity {
        return new UserEntity(
            "Teste Testando",
            "teste@gmail.com",
            "794.387.970-84",
            "teste123",
        );
    }

    static createProduct(): ProductEntity {
        return new ProductEntity(
            "Any Product",
            "Random Brand",
            "53024210000186",
            85.4,
            "3e8d19ea157148a30f49e55b877788c17c64596a",
        );
    }

    static createUserProduct(): UserProductEntity {
        return new UserProductEntity(
            CreateUserProductTestUtils.createUser(),
            CreateUserProductTestUtils.createProduct(),
        );
    }

    static toResponse(): UserProductResponse {
        const userResponse = new UserResponse(
            CreateUserProductTestUtils.createUser().fullName,
            CreateUserProductTestUtils.createUser().email,
        );

        const productResponse = new ProductResponse(
            CreateUserProductTestUtils.createProduct().name,
            CreateUserProductTestUtils.createProduct().brand,
            CreateUserProductTestUtils.createProduct().price,
        );

        return new UserProductResponse(userResponse, productResponse);
    }
}
