import { BadRequestException } from "@nestjs/common";

export class ProductNotFoundByIdException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "The product with the provided ID does not exist";

    constructor() {
        super(ProductNotFoundByIdException.EXCEPTION_MESSAGE);
    }
}
