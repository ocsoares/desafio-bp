import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodProductRegistrationSchemaType } from "../types/ZodProductRegistrationSchemaType";
import { zodProductRegistrationSchema } from "../schemas/zodProductRegistrationSchema";
import { IProductRegistrationData } from "../interfaces/IProductRegistrationData";
import { ProductRegistrationService } from "../services/ProductRegistrationService";

export const useProductRegistration = () => {
    const [formSent, setFormSent] = useState(false);
    const [apiFailed, setApiFailed] = useState(false);
    const [apiFailedMessage, setApiFailedMessage] = useState("");
    const [
        productAlreadyRegisteredByCompany,
        setProductAlreadyRegisteredByCompany,
    ] = useState(false);
    const [
        productAlreadyRegisteredByCompanyMessage,
        setProductAlreadyRegisteredByCompanyMessage,
    ] = useState("");

    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ZodProductRegistrationSchemaType>({
        mode: "all",
        resolver: zodResolver(zodProductRegistrationSchema),
    });

    const handleSubmitData = async (data: IProductRegistrationData) => {
        try {
            const signup = await ProductRegistrationService.execute(data);

            if (
                signup.message ===
                ProductRegistrationService.PRODUCT_ALREADY_REGISTERED_BY_COMPANY_EXCEPTION_MESSAGE
            ) {
                setProductAlreadyRegisteredByCompany(true);
                setProductAlreadyRegisteredByCompanyMessage(
                    "Esse produto já está cadastrado por essa empresa. Tente outro.",
                );

                setValue("name", "");
                setValue("brand", "");
                setValue("cnpj", "");

                return;
            }

            setApiFailed(false);
            setProductAlreadyRegisteredByCompany(false);
            setProductAlreadyRegisteredByCompanyMessage("");
            setFormSent(true);

            reset();

            setTimeout(() => {
                push("/product/list");
            }, 5000);
        } catch (error) {
            setApiFailed(true);
            setApiFailedMessage((error as Error).message);
        }
    };

    return {
        formSent,
        register,
        handleSubmit,
        control,
        errors,
        handleSubmitData,
        apiFailed,
        apiFailedMessage,
        productAlreadyRegisteredByCompany,
        productAlreadyRegisteredByCompanyMessage,
    };
};
