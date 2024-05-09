"use client";

import { AuthTextLink } from "@/app/auth/components/AuthTextLink";
import { AppAlert } from "@/shared/components/AppAlert";
import { AppButton } from "@/shared/components/AppButton";
import AppTextField from "@/shared/components/AppTextField";
import { Box, Grid, Stack } from "@mui/material";
import { useProductRegistration } from "../hooks/useProductRegistration";

export default function ProductRegistrationForm() {
    const {
        handleSubmit,
        handleSubmitData,
        control,
        errors,
        register,
        formSent,
        apiFailed,
        apiFailedMessage,
        productAlreadyRegisteredByCompany,
        productAlreadyRegisteredByCompanyMessage,
    } = useProductRegistration();

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
                        error={
                            errors.name || productAlreadyRegisteredByCompany
                                ? true
                                : false
                        }
                        helperText={
                            errors.name?.message ||
                            productAlreadyRegisteredByCompanyMessage
                        }
                        id="name"
                        type="text"
                        label="Nome do produto"
                        {...register("name")}
                    />

                    <AppTextField
                        control={control}
                        error={
                            errors.brand || productAlreadyRegisteredByCompany
                                ? true
                                : false
                        }
                        helperText={
                            errors.brand?.message ||
                            productAlreadyRegisteredByCompanyMessage
                        }
                        id="brand"
                        type="text"
                        label="Marca"
                        {...register("brand")}
                    />

                    <AppTextField
                        control={control}
                        autoFocus={true}
                        error={
                            errors.cnpj || productAlreadyRegisteredByCompany
                                ? true
                                : false
                        }
                        helperText={
                            errors.cnpj?.message ||
                            productAlreadyRegisteredByCompanyMessage
                        }
                        id="cnpj"
                        type="text"
                        minLength={14}
                        maxLength={14}
                        label="CNPJ"
                        {...register("cnpj")}
                    />

                    <AppTextField
                        control={control}
                        error={errors.price ? true : false}
                        helperText={errors.price?.message}
                        id="price"
                        type="number"
                        label="Preço"
                        {...register("price", { valueAsNumber: true })}
                    />
                </Grid>
                <AppButton disabled={formSent} text="Cadastrar" />

                <AuthTextLink
                    text="Já tem um produto cadastrado? "
                    link="/product/user"
                    textLink="Cadastre para um usuário"
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
                    message="Seu produto foi registrado com sucesso em nosso sistema !"
                />

                <AppAlert
                    showAlert={formSent && !apiFailed}
                    timeout={3000}
                    severity="info"
                    title="Redirecionando"
                    message="Você será redirecionado para a lista de"
                    messageHTML={<strong> produtos</strong>}
                />
            </Stack>
        </>
    );
}
