import { BadRequestException } from "@nestjs/common";

export class UserAlreadyExistsByEmailException extends BadRequestException {
    static readonly EXCEPTION_MESSAGE =
        "Already exists a user registered with this email !";

    constructor() {
        super(UserAlreadyExistsByEmailException.EXCEPTION_MESSAGE);
    }
}
