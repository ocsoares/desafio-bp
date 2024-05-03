import { PasswordHasher } from "src/cryptography/abstracts/password-hasher";
import { hash, compare } from "bcrypt";

export class BcryptHasher implements PasswordHasher {
    async hash(plainPassword: string, salt = 10): Promise<string> {
        return hash(plainPassword, salt);
    }

    async compare(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return compare(plainPassword, hashedPassword);
    }
}
