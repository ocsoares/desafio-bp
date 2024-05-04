import { Injectable } from "@nestjs/common";
import { UserNotFoundByIdException } from "src/exceptions/user/user-not-found-by-id.exception";
import { IService } from "src/interfaces/IService";
import { ProductMapper } from "src/modules/product/mappers/ProductMapper";
import { ProductResponse } from "src/modules/product/responses/ProductResponse";
import { UserProductRepository } from "src/repositories/abstracts/UserProductRepository";
import { UserRepository } from "src/repositories/abstracts/UserRepository";

@Injectable()
export class FindAllUserProductsService
    implements IService<string, ProductResponse[]>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userProductRepository: UserProductRepository,
        private readonly productMapper: ProductMapper,
    ) {}

    async execute(userId: string): Promise<ProductResponse[]> {
        const userFoundById = await this.userRepository.findById(userId);

        if (!userFoundById) {
            throw new UserNotFoundByIdException();
        }

        const allUserProducts =
            await this.userProductRepository.findAll(userId);

        return this.productMapper.toResponseArray(allUserProducts);
    }
}
