import { UserProductEntity } from "src/entity/UserProductEntity";

export abstract class UserProductRepository {
    abstract create(
        userId: string,
        productId: string,
    ): Promise<UserProductEntity>;
}
