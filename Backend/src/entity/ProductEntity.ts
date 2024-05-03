export class ProductEntity {
    constructor(
        public readonly name: string,
        public readonly brand: string,
        public readonly cnpj: string,
        public readonly price: number,
        public readonly hash: string,
    ) {}
}
