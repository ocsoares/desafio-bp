import { ZodType, z } from "zod";
import { IUserProductRegistrationData } from "../interfaces/IUserProductRegistrationData";

export const zodUserProductRegistrationSchema = z.object({
    userId: z
        .string({ required_error: "O ID do usuário é obrigatório !" })
        .min(1, "O ID do usuário é obrigatório !"),

    productId: z
        .string({ required_error: "O ID do produto é obrigatório !" })
        .min(1, "O ID do produto é obrigatório !"),
}) satisfies ZodType<IUserProductRegistrationData>;
