import { UserProductEntity } from "src/entity/UserProductEntity";
import { UserProductRepository } from "src/repositories/abstracts/UserProductRepository";
import { PrismaService } from "../prisma-client.service";
import { Injectable } from "@nestjs/common";

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
}
