import { ProductEntity } from "src/entity/ProductEntity";
import { CreateProductDTO } from "src/modules/product/use-cases/create-product/dtos/CreateProductDTO";

export abstract class ProductRepository {
    abstract create(data: CreateProductDTO): Promise<ProductEntity>;
    abstract findByCNPJ(cnpj: string): Promise<ProductEntity>;
}
