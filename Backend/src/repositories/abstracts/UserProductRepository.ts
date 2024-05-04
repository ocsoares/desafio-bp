import { ProductEntity } from "src/entity/ProductEntity";
import { UserProductEntity } from "src/entity/UserProductEntity";

export abstract class UserProductRepository {
    abstract create(
        userId: string,
        productId: string,
    ): Promise<UserProductEntity>;
    abstract findAll(userId: string): Promise<ProductEntity[]>;
}
