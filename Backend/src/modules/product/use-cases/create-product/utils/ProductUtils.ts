import { createHash } from "crypto";
import { CreateProductDTO } from "../dtos/CreateProductDTO";

export class ProductUtils {
    generateHash({ name, brand, cnpj }: CreateProductDTO): string {
        const productHash = createHash("sha256");

        productHash.update(`${name}${brand}${cnpj}`);

        return productHash.digest("hex");
    }
}
