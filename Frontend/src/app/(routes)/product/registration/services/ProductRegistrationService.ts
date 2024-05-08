import { IProductRegistrationResponse } from "../interfaces/IProductRegistrationResponse";
import { IProductRegistrationData } from "../interfaces/IProductRegistrationData";

export class ProductRegistrationService {
    static readonly PRODUCT_ALREADY_REGISTERED_BY_COMPANY_EXCEPTION_MESSAGE =
        "There is already exists a product registered by this company !";

    static async execute(data: IProductRegistrationData) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_URL}/product`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            return response.json() as unknown as IProductRegistrationResponse;
        } catch (error) {
            throw new Error(
                "Erro ao efetuar o cadastro do produto. Tente novamente mais tarde.",
            );
        }
    }
}
