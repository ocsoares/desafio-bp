import { UserProductEntity } from "src/entity/UserProductEntity";
import { UserProductRepository } from "src/repositories/abstracts/UserProductRepository";
import { PrismaService } from "../prisma-client.service";
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/entity/ProductEntity";

@Injectable()
export class PrismaUserProductRepository implements UserProductRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(
        userId: string,
        productId: string,
    ): Promise<UserProductEntity> {
        const createdUserProduct = await this.prismaService.userProduct.create({
            data: {
                user: { connect: { id: userId } },
                product: { connect: { id: productId } },
            },
            include: { user: true, product: true },
        });

        return new UserProductEntity(
            createdUserProduct.user,
            createdUserProduct.product,
        );
    }

    async findAll(userId: string): Promise<ProductEntity[]> {
        const userProducts = await this.prismaService.userProduct.findMany({
            where: { userId },
            include: { product: true },
        });

        return userProducts.map(
            (userProductPrisma) => userProductPrisma.product,
        );
    }
}
