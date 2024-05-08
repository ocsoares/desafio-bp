import { ZodType, z } from "zod";
import { IProductRegistrationData } from "../interfaces/IProductRegistrationData";
import { cnpj } from "cpf-cnpj-validator";

export const zodProductRegistrationSchema = z.object({
    name: z
        .string({ required_error: "O nome do produto é obrigatório !" })
        .min(1, "O nome do produto é obrigatório !"),

    brand: z
        .string({ required_error: "A marca do produto é obrigatória !" })
        .min(1, "A marca do produto é obrigatória !"),

    cnpj: z
        .string({ required_error: "O CNPJ do produto é obrigatório !" })
        .min(1, "O CNPJ do produto é obrigatório !")
        .refine(
            (cnpjValue) => {
                return cnpj.isValid(cnpjValue, true);
            },
            { message: "CNPJ inválido !" },
        ),

    price: z
        .number({ required_error: "O preço do produto é obrigatório !" })
        .min(1, "O preço do produto é obrigatório !"),
}) satisfies ZodType<IProductRegistrationData>;
