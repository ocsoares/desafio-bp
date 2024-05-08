import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSignUpSchemaType } from "../types/ZodSignUpSchemaType";
import { zodSignUpSchema } from "../schemas/zodSignUpSchema";
import { ISignUpData } from "../types/ISignUpData";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpUserService } from "../services/SignUpUserService";

export const useAuthSignUp = () => {
    const [formSent, setFormSent] = useState(false);
    const [apiFailed, setApiFailed] = useState(false);
    const [apiFailedMessage, setApiFailedMessage] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [emailExistsMessage, setEmailExistsMessage] = useState("");
    const [cpfExists, setCPFExists] = useState(false);
    const [cpfExistsMessage, setCPFExistsMessage] = useState("");

    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ZodSignUpSchemaType>({
        mode: "all",
        resolver: zodResolver(zodSignUpSchema),
    });

    const handleSubmitData = async (data: ISignUpData) => {
        try {
            const signup = await SignUpUserService.execute(data);

            if (
                signup.message ===
                SignUpUserService.USER_ALREADY_EXISTS_BY_EMAIL_EXCEPTION_MESSAGE
            ) {
                setCPFExists(false);
                setCPFExistsMessage("");

                setEmailExists(true);
                setEmailExistsMessage(
                    "Esse email já está em uso. Tente outro.",
                );

                setValue("email", "");

                return;
            }

            if (
                signup.message ===
                SignUpUserService.USER_ALREADY_EXISTS_BY_CPF_EXCEPTION_MESSAGE
            ) {
                setEmailExists(false);
                setEmailExistsMessage("");

                setCPFExists(true);
                setCPFExistsMessage("Esse CPF já está em uso. Tente outro.");

                setValue("cpf", "");

                return;
            }

            setApiFailed(false);
            setEmailExists(false);
            setEmailExistsMessage("");
            setCPFExists(false);
            setCPFExistsMessage("");
            setFormSent(true);

            reset();

            setTimeout(() => {
                push("/product/register");
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
        emailExists,
        emailExistsMessage,
        cpfExists,
        cpfExistsMessage,
    };
};
