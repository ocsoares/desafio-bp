"use client";

import { AuthTextLink } from "@/app/auth/components/AuthTextLink";
import { AppAlert } from "@/shared/components/AppAlert";
import { AppButton } from "@/shared/components/AppButton";
import AppTextField from "@/shared/components/AppTextField";
import { Box, Grid, Stack } from "@mui/material";
import { useUserProductRegistration } from "../hooks/useUserProductRegistration";

export default function UserProductRegistrationForm() {
    const {
        handleSubmit,
        handleSubmitData,
        control,
        errors,
        register,
        formSent,
        apiFailed,
        apiFailedMessage,
        userNotFoundById,
        userNotFoundByIdMessage,
        productNotFoundById,
        productNotFoundByIdMessage,
    } = useUserProductRegistration();

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
                        error={errors.userId || userNotFoundById ? true : false}
                        helperText={
                            errors.userId?.message || userNotFoundByIdMessage
                        }
                        id="userId"
                        type="text"
                        label="ID do usuário"
                        {...register("userId")}
                    />

                    <AppTextField
                        control={control}
                        autoFocus={true}
                        error={
                            errors.productId || productNotFoundById
                                ? true
                                : false
                        }
                        helperText={
                            errors.productId?.message ||
                            productNotFoundByIdMessage
                        }
                        id="productId"
                        type="text"
                        label="ID do produto"
                        {...register("productId")}
                    />
                </Grid>
                <AppButton disabled={formSent} text="Cadastrar" />

                <AuthTextLink
                    text="Não tem uma conta? "
                    link="/auth/signup"
                    textLink="Cadastre sua conta"
                />
            </Box>
            <Stack spacing={2} sx={{ position: "absolute", top: 70, right: 0 }}>
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
                    message="O produto do usuário foi cadastrado com sucesso em nosso sistema !"
                />

                <AppAlert
                    showAlert={formSent && !apiFailed}
                    timeout={3000}
                    severity="info"
                    title="Redirecionando"
                    message="Você será redirecionado para a página de"
                    messageHTML={<strong> cadastrar usuário</strong>}
                />
            </Stack>
        </>
    );
}
