import { Injectable } from "@nestjs/common";
import { IService } from "src/interfaces/IService";
import { ProductResponse } from "../../responses/ProductResponse";
import { CreateProductDTO } from "./dtos/CreateProductDTO";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductRepository } from "src/repositories/abstracts/ProductRepository";
import { ProductUtils } from "./utils/ProductUtils";
import { ProductAlreadyRegisteredByCompanyException } from "src/exceptions/product/product-already-registered-by-company.exception";

@Injectable()
export class CreateProductService
    implements IService<CreateProductDTO, ProductResponse>
{
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productMapper: ProductMapper,
        private readonly productUtils: ProductUtils,
    ) {}
    async execute(data: CreateProductDTO): Promise<ProductResponse> {
        const productHash = this.productUtils.generateHash(data);

        const productAlreadyExistsByHash =
            await this.productRepository.findByHash(productHash);

        if (productAlreadyExistsByHash) {
            throw new ProductAlreadyRegisteredByCompanyException();
        }

        const createdProduct = await this.productRepository.create(
            data,
            productHash,
        );

        return this.productMapper.toResponse(createdProduct);
    }
}
