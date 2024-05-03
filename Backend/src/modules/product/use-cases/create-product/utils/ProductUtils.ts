import { createHash } from "crypto";
import { CreateProductDTO } from "../dtos/CreateProductDTO";

export class ProductUtils {
    generateHash({ name, brand, cnpj }: CreateProductDTO): string {
        return createHash("sha256")
            .update(`${name}${brand}${cnpj}`)
            .digest("hex");
    }
}
