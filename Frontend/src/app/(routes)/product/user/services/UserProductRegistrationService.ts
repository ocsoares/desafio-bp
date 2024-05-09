import { IUserProductRegistrationData } from "../interfaces/IUserProductRegistrationData";
import { IUserProductRegistrationResponse } from "../interfaces/IUserProductRegistrationResponse";

export class UserProductRegistrationService {
    static readonly USER_NOT_FOUND_BY_ID_EXCEPTION_MESSAGE =
        "The user with the provided ID does not exist";

    static readonly PRODUCT_NOT_FOUND_BY_ID_EXCEPTION_MESSAGE =
        "The product with the provided ID does not exist";

    static async execute({ userId, productId }: IUserProductRegistrationData) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_URL}/user/${userId}/product/${productId}`,
                {
                    method: "POST",
                },
            );

            return response.json() as unknown as IUserProductRegistrationResponse;
        } catch (error) {
            throw new Error(
                "Erro ao efetuar o cadastro do produto para o usuário. Tente novamente mais tarde.",
            );
        }
    }
}
