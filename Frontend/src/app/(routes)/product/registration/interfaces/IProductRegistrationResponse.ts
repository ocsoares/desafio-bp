export interface IProductRegistrationResponse {
    readonly name?: string;
    readonly brand?: string;
    readonly price?: number;
    readonly message?: string;
    readonly error?: string;
    readonly statusCode?: number;
}
