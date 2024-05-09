export interface IUserProductRegistrationResponse {
    readonly userResponse?: {
        readonly fullName: string;
        readonly email: string;
    };
    readonly productResponse?: {
        readonly name: string;
        readonly brand: string;
        readonly price: number;
    };
    readonly message?: string;
    readonly error?: string;
    readonly statusCode?: number;
}
