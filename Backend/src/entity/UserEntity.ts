export class UserEntity {
    constructor(
        public readonly fullName: string,
        public readonly email: string,
        public readonly cpf: string,
        public readonly password: string,
    ) {}
}
