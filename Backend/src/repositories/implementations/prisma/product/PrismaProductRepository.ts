import { ProductEntity } from "src/entity/ProductEntity";
import { CreateProductDTO } from "src/modules/product/use-cases/create-product/dtos/CreateProductDTO";
import { ProductRepository } from "src/repositories/abstracts/ProductRepository";
import { PrismaService } from "../prisma-client.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateProductDTO, hash: string): Promise<ProductEntity> {
        return await this.prismaService.product.create({
            data: { ...data, hash },
        });
    }

    async findByHash(hash: string): Promise<ProductEntity | null> {
        return await this.prismaService.product.findUnique({ where: { hash } });
    }

    async findById(id: string): Promise<ProductEntity | null> {
        return await this.prismaService.product.findUnique({ where: { id } });
    }
}
