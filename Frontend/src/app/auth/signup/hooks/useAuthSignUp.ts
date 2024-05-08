// import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSignUpSchemaType } from "../types/ZodSignUpSchemaType";
import { zodSignUpSchema } from "../schemas/zodSignUpSchema";
import { ISignUpData } from "../types/ISignUpData";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUserService } from "../services/signUpUserService";

export const useAuthSignUp = () => {
    const [formSent, setFormSent] = useState(false);
    const [apiFailed, setApiFailed] = useState(false);
    const [apiFailedMessage, setApiFailedMessage] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [emailExistsMessage, setEmailExistsMessage] = useState("");
    const [cpfExists, setCPFExists] = useState(false);
    const [cpfExistsMessage, setCPFExistsMessage] = useState("");

    // const { push } = useRouter();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ZodSignUpSchemaType>({
        mode: "all",
        resolver: zodResolver(zodSignUpSchema),
    });

    const handleSubmitData = async (data: ISignUpData) => {
        try {
            const signup = await signUpUserService(data);

            if (signup.statusCode === 409) {
                setEmailExists(true);
                setEmailExistsMessage(
                    "Esse email já está em uso. Tente outro.",
                );

                // FAZER em OUTRO IF pq esse é do EMAIL !!!!
                setCPFExists(true);
                setCPFExistsMessage("Esse CPF já está em uso. Tente outro.");

                reset();

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
                console.log("COLOCAR aqui para ir para a ROTA de PRODUCTS !!!");
                // push("/auth/login");
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
