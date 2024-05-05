import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { UserNotFoundByIdException } from "../../../../exceptions/user/user-not-found-by-id.exception";
import { IService } from "../../../../interfaces/IService";
import { ProductMapper } from "../../../../modules/product/mappers/ProductMapper";
import { ProductResponse } from "../../../../modules/product/responses/ProductResponse";
import { UserProductRepository } from "../../../../repositories/abstracts/UserProductRepository";
import { UserRepository } from "../../../../repositories/abstracts/UserRepository";

@Injectable()
export class FindAllUserProductsService
    implements IService<string, ProductResponse[]>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userProductRepository: UserProductRepository,
        private readonly productMapper: ProductMapper,
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) {}

    private readonly REDIS_KEY = "userProducts";

    async execute(userId: string): Promise<ProductResponse[]> {
        const userFoundById = await this.userRepository.findById(userId);

        if (!userFoundById) {
            throw new UserNotFoundByIdException();
        }

        const cachedUserProducts = (await this.cache.get(
            this.REDIS_KEY,
        )) as ProductResponse[];

        if (cachedUserProducts) {
            return cachedUserProducts;
        }

        const allUserProducts =
            await this.userProductRepository.findAll(userId);

        const allUserProductsResponse =
            this.productMapper.toResponseArray(allUserProducts);

        await this.cache.set(this.REDIS_KEY, allUserProductsResponse);

        return allUserProductsResponse;
    }
}
