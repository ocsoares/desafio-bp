import { ISignUpResponse } from "../../interfaces/ISignUpResponse";
import { ISignUpData } from "../types/ISignUpData";

export class SignUpUserService {
    static USER_ALREADY_EXISTS_BY_EMAIL_EXCEPTION_MESSAGE =
        "Already exists a user registered with this email !";

    static USER_ALREADY_EXISTS_BY_CPF_EXCEPTION_MESSAGE =
        "Already exists a user registered with this CPF !";

    static async execute(data: ISignUpData): Promise<ISignUpResponse> {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_EXTERNAL_BACKEND_URL}/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            return response.json() as unknown as ISignUpResponse;
        } catch (error) {
            throw new Error(
                "Erro ao efetuar o cadastro. Tente novamente mais tarde.",
            );
        }
    }
}
