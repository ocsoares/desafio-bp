import { BadRequestException } from "@nestjs/common";

export class ProductAlreadyRegisteredByCompanyException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "There is already exists a product registered by this company !";

    constructor() {
        super(ProductAlreadyRegisteredByCompanyException.EXCEPTION_MESSAGE);
    }
}
