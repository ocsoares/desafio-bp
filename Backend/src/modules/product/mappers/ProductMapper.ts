import { ProductEntity } from "src/entity/ProductEntity";
import { ProductResponse } from "../responses/ProductResponse";

export class ProductMapper {
    toResponse({ name, brand, price }: ProductEntity): ProductResponse {
        return new ProductResponse(name, brand, price);
    }

    toResponseArray(productEntityArray: ProductEntity[]): ProductResponse[] {
        return productEntityArray.map((productEntity) =>
            this.toResponse(productEntity),
        );
    }
}
