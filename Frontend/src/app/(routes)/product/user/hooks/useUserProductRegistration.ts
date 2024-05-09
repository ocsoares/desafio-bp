import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodUserProductRegistrationSchemaType } from "../types/ZodUserProductRegistrationSchemaType";
import { zodUserProductRegistrationSchema } from "../schemas/zodUserProductRegistrationSchema";
import { IUserProductRegistrationData } from "../interfaces/IUserProductRegistrationData";
import { UserProductRegistrationService } from "../services/UserProductRegistrationService";

export const useUserProductRegistration = () => {
    const [formSent, setFormSent] = useState(false);
    const [apiFailed, setApiFailed] = useState(false);
    const [apiFailedMessage, setApiFailedMessage] = useState("");
    const [userNotFoundById, setUserNotFoundById] = useState(false);
    const [userNotFoundByIdMessage, setUserNotFoundByIdMessage] = useState("");
    const [productNotFoundById, setProductNotFoundById] = useState(false);
    const [productNotFoundByIdMessage, setProductNotFoundByIdMessage] =
        useState("");

    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ZodUserProductRegistrationSchemaType>({
        mode: "all",
        resolver: zodResolver(zodUserProductRegistrationSchema),
    });

    const handleSubmitData = async (data: IUserProductRegistrationData) => {
        try {
            const signup = await UserProductRegistrationService.execute(data);

            if (
                signup.message ===
                UserProductRegistrationService.USER_NOT_FOUND_BY_ID_EXCEPTION_MESSAGE
            ) {
                setProductNotFoundById(false);
                setProductNotFoundByIdMessage("");

                setUserNotFoundById(true);
                setUserNotFoundByIdMessage(
                    "Não foi possível encontrar o usuário pelo ID fornecido. Tente outro.",
                );

                setValue("userId", "");

                return;
            }

            if (
                signup.message ===
                UserProductRegistrationService.PRODUCT_NOT_FOUND_BY_ID_EXCEPTION_MESSAGE
            ) {
                setUserNotFoundById(false);
                setUserNotFoundByIdMessage("");

                setProductNotFoundById(true);
                setProductNotFoundByIdMessage(
                    "Não foi possível encontrar o produto pelo ID fornecido. Tente outro.",
                );

                setValue("productId", "");

                return;
            }

            setApiFailed(false);
            setProductNotFoundById(false);
            setProductNotFoundByIdMessage("false");
            setUserNotFoundById(false);
            setUserNotFoundByIdMessage("");

            setFormSent(true);

            reset();

            setTimeout(() => {
                push("/auth/signup");
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
        userNotFoundById,
        userNotFoundByIdMessage,
        productNotFoundById,
        productNotFoundByIdMessage,
    };
};
