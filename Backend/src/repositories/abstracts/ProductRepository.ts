import { ProductEntity } from "src/entity/ProductEntity";
import { CreateProductDTO } from "src/modules/product/use-cases/create-product/dtos/CreateProductDTO";

export abstract class ProductRepository {
    abstract create(
        data: CreateProductDTO,
        hash: string,
    ): Promise<ProductEntity>;
    abstract findByHash(hash: string): Promise<ProductEntity | null>;
    abstract findById(id: string): Promise<ProductEntity | null>;
}
