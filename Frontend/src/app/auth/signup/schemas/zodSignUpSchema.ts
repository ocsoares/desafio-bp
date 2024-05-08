import { ZodType, z } from "zod";
import { capitalize } from "lodash";
import { ISignUpData } from "../types/ISignUpData";
import { cpf } from "cpf-cnpj-validator";

export const zodSignUpSchema = z.object({
    fullName: z
        .string({ required_error: "O nome é obrigatório !" })
        .min(3, "O nome deve ter no mínimo 3 caracteres !")
        .transform((fullName) => {
            fullName = fullName.trim();
            fullName = fullName.replaceAll(" ", "");
            fullName = capitalize(fullName);

            return fullName;
        }),

    email: z
        .string({ required_error: "O email é obrigatório !" })
        .min(1, "O email é obrigatório !")
        .email("Formato de email inválido !"),

    cpf: z
        .string({ required_error: "O CPF é obrigatório !" })
        .min(1, "O CPF é obrigatório !")
        .min(11, "O CPF deve estar em um formato válido !")
        .max(14, "O CPF deve estar em um formato válido !")
        .refine(
            (cpfValue) => {
                return cpf.isValid(cpfValue, true);
            },
            { message: "CPF inválido !" },
        ),

    password: z
        .string({ required_error: "A senha é obrigatória !" })
        .min(7, "A senha precisa ter no mínimo 7 caracteres !"),
}) satisfies ZodType<ISignUpData>;
