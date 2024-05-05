import { Injectable } from "@nestjs/common";
import { UserProductRepository } from "../../../../repositories/abstracts/UserProductRepository";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";
import { ProductRepository } from "../../../../repositories/abstracts/ProductRepository";
import { IServiceTwoArguments } from "../../../../interfaces/IServiceTwoArguments";
import { UserNotFoundByIdException } from "../../../../exceptions/user/user-not-found-by-id.exception";
import { ProductNotFoundByIdException } from "../../../../exceptions/product/product-not-found-by-id.exception";
import { UserProductMapper } from "../../mappers/UserProductMapper";
import { UserProductResponse } from "../../responses/UserProductResponse";

@Injectable()
export class CreateUserProductService
    implements IServiceTwoArguments<string, string, UserProductResponse>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly productRepository: ProductRepository,
        private readonly userProductRepository: UserProductRepository,
        private readonly userProductMapper: UserProductMapper,
    ) {}
    async execute(
        userId: string,
        productId: string,
    ): Promise<UserProductResponse> {
        const userFoundById = await this.userRepository.findById(userId);

        if (!userFoundById) {
            throw new UserNotFoundByIdException();
        }

        const productFoundById =
            await this.productRepository.findById(productId);

        if (!productFoundById) {
            throw new ProductNotFoundByIdException();
        }

        const createdUserProduct = await this.userProductRepository.create(
            userId,
            productId,
        );

        return this.userProductMapper.toResponse(createdUserProduct);
    }
}
