import { BadRequestException } from "@nestjs/common";

export class ProductAlreadyExistsByCNPJException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "Already exists a product registered with this CNPJ !";

    constructor() {
        super(ProductAlreadyExistsByCNPJException.EXCEPTION_MESSAGE);
    }
}
