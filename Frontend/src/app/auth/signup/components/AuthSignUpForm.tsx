"use client";

import Grid from "@mui/material/Grid";
import AppTextField from "../../../../shared/components/AppTextField";
import { Box, Stack } from "@mui/material";
import { AppButton } from "../../../../shared/components/AppButton";
import { AuthTextLink } from "../../components/AuthTextLink";
import { useAuthSignUp } from "../hooks/useAuthSignUp";
import { AppAlert } from "@/shared/components/AppAlert";

export function AuthSignUpForm() {
    const {
        handleSubmit,
        handleSubmitData,
        control,
        errors,
        register,
        formSent,
        apiFailed,
        apiFailedMessage,
        emailExists,
        emailExistsMessage,
        cpfExists,
        cpfExistsMessage,
    } = useAuthSignUp();

    return (
        <>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(handleSubmitData)}
                sx={{ mt: 3 }}
            >
                <Grid container spacing={4}>
                    <AppTextField
                        control={control}
                        autoFocus={true}
                        error={errors.fullName ? true : false}
                        helperText={errors.fullName?.message}
                        id="fullName"
                        type="text"
                        label="Nome completo"
                        {...register("fullName")}
                    />

                    <AppTextField
                        control={control}
                        error={errors.email || emailExists ? true : false}
                        helperText={errors.email?.message || emailExistsMessage}
                        id="email"
                        type="email"
                        label="Email"
                        {...register("email")}
                    />

                    <AppTextField
                        control={control}
                        autoFocus={true}
                        error={errors.cpf || cpfExists ? true : false}
                        helperText={errors.cpf?.message || cpfExistsMessage}
                        id="cpf"
                        type="text"
                        minLength={11}
                        maxLength={14}
                        label="CPF"
                        {...register("cpf")}
                    />

                    <AppTextField
                        control={control}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        id="password"
                        type="password"
                        label="Senha"
                        {...register("password")}
                    />
                </Grid>
                <AppButton disabled={formSent} text="Cadastrar" />

                <AuthTextLink
                    text="Já tem uma conta? "
                    link="product"
                    textLink="Cadastre um produto"
                />
            </Box>
            <Stack spacing={2} sx={{ position: "absolute", top: 70, right: 0 }}>
                {/* Dentro de uma Condicional para NÃO ocupar ESPAÇO desnecessário do "Stack" */}
                {apiFailed && (
                    <AppAlert
                        showAlert={!formSent && apiFailed}
                        severity="error"
                        title="Erro"
                        message={apiFailedMessage}
                    />
                )}

                <AppAlert
                    showAlert={formSent && !apiFailed}
                    color="success"
                    severity="success"
                    title="Sucesso"
                    message="Sua foi conta registrada com sucesso em nosso sistema !"
                />

                <AppAlert
                    showAlert={formSent && !apiFailed}
                    timeout={3000}
                    severity="info"
                    title="Redirecionando"
                    message="Você será redirecionado para cadastrar o"
                    messageHTML={<strong> produto</strong>}
                />
            </Stack>
        </>
    );
}
