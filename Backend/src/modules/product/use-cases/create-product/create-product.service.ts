import { Injectable } from "@nestjs/common";
import { IService } from "src/interfaces/IService";
import { ProductResponse } from "../../responses/ProductResponse";
import { CreateProductDTO } from "./dtos/CreateProductDTO";
import { ProductAlreadyExistsByCNPJException } from "src/exceptions/product/product-already-exists-by-cnpj.exception";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductRepository } from "src/repositories/abstracts/ProductRepository";

@Injectable()
export class CreateProductService
    implements IService<CreateProductDTO, ProductResponse>
{
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productMapper: ProductMapper,
    ) {}
    async execute(data: CreateProductDTO): Promise<ProductResponse> {
        const productAlreadyExistsByCNPJ =
            await this.productRepository.findByCNPJ(data.cnpj);

        if (productAlreadyExistsByCNPJ) {
            throw new ProductAlreadyExistsByCNPJException();
        }

        const createdProduct = await this.productRepository.create(data);

        return this.productMapper.toResponse(createdProduct);
    }
}
