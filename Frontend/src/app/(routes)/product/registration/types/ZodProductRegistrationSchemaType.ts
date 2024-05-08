import { z } from "zod";
import { zodProductRegistrationSchema } from "../schemas/zodProductRegistrationSchema";

export type ZodProductRegistrationSchemaType = z.infer<
    typeof zodProductRegistrationSchema
>;
