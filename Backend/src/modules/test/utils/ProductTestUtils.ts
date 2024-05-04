import { CreateProductDTO } from "src/modules/product/use-cases/create-product/dtos/CreateProductDTO";
import { ProductEntity } from "../../../entity/ProductEntity";
import { ProductResponse } from "../../../modules/product/responses/ProductResponse";

export class ProductTestUtils {
    static generateHash(): string {
        return Math.random().toString();
    }

    static createProduct(): ProductEntity {
        return new ProductEntity(
            "Any Product",
            "Random Brand",
            "95389763000182",
            85.4,
            ProductTestUtils.generateHash(),
        );
    }

    static createProductDTOData(): CreateProductDTO {
        const data: CreateProductDTO = {
            name: "Any Product",
            brand: "Random Brand",
            cnpj: "95389763000182",
            price: 85.4,
        };

        return data;
    }

    static toResponse(): ProductResponse {
        return new ProductResponse(
            ProductTestUtils.createProduct().name,
            ProductTestUtils.createProduct().brand,
            ProductTestUtils.createProduct().price,
        );
    }
}
