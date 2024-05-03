import { ProductEntity } from "src/entity/ProductEntity";
import { CreateProductDTO } from "src/modules/product/use-cases/create-product/dtos/CreateProductDTO";
import { ProductRepository } from "src/repositories/abstracts/ProductRepository";
import { PrismaService } from "../prisma-client.service";

export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateProductDTO): Promise<ProductEntity> {
        return await this.prismaService.product.create({ data });
    }

    async findByCNPJ(cnpj: string): Promise<ProductEntity> {
        return await this.prismaService.product.findUnique({ where: { cnpj } });
    }
}
