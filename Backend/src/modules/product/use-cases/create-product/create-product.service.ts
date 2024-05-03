import { Injectable } from "@nestjs/common";
import { IService } from "src/interfaces/IService";
import { ProductResponse } from "../../responses/ProductResponse";
import { CreateProductDTO } from "./dtos/CreateProductDTO";
import { PrismaProductRepository } from "src/repositories/implementations/prisma/product/PrismaProductRepository";
import { ProductAlreadyExistsByCNPJException } from "src/exceptions/product/product-already-exists-by-cnpj.exception";
import { ProductMapper } from "../../mappers/ProductMapper";

@Injectable()
export class CreateProductService
    implements IService<CreateProductDTO, ProductResponse>
{
    constructor(
        private readonly prismaProductRepository: PrismaProductRepository,
        private readonly productMapper: ProductMapper,
    ) {}
    async execute(data: CreateProductDTO): Promise<ProductResponse> {
        const productAlreadyExistsByCNPJ =
            await this.prismaProductRepository.findByCNPJ(data.cnpj);

        if (productAlreadyExistsByCNPJ) {
            throw new ProductAlreadyExistsByCNPJException();
        }

        const createdProduct = await this.prismaProductRepository.create(data);

        return this.productMapper.toResponse(createdProduct);
    }
}
