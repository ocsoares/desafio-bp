export class ProductEntity {
    constructor(
        public readonly name: string,
        public readonly brand: string,
        public readonly description: string,
        public readonly price: number,
    ) {}
}
