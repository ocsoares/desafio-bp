import { ProductEntity } from "./ProductEntity";
import { UserEntity } from "./UserEntity";

export class UserProductEntity {
    constructor(
        public readonly userEntity: UserEntity,
        public readonly productEntity: ProductEntity,
    ) {}
}
