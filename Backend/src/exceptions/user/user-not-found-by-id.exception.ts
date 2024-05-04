import { BadRequestException } from "@nestjs/common";

export class UserNotFoundByIdException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "The user with the provided ID does not exist";

    constructor() {
        super(UserNotFoundByIdException.EXCEPTION_MESSAGE);
    }
}
