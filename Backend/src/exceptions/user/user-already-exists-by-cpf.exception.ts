import { BadRequestException } from "@nestjs/common";

export class UserAlreadyExistsByCPFException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "Already exists a user registered with this CPF !";

    constructor() {
        super(UserAlreadyExistsByCPFException.EXCEPTION_MESSAGE);
    }
}
