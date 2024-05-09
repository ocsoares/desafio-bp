import { z } from "zod";
import { zodUserProductRegistrationSchema } from "../schemas/zodUserProductRegistrationSchema";

export type ZodUserProductRegistrationSchemaType = z.infer<
    typeof zodUserProductRegistrationSchema
>;
