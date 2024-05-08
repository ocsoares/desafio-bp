import { AuthSignUpForm } from "@/app/auth/signup/components/AuthSignUpForm";
import { AppAvatar } from "@/shared/components/AppAvatar";
import { AddShoppingCart } from "@mui/icons-material";
import { Container, Paper, Box, Typography } from "@mui/material";

export default function ProductRegistration() {
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: 5,
                    marginBottom: 5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppAvatar avatar={<AddShoppingCart color="secondary" />} />
                    <Typography variant="h5">Cadastrar produto</Typography>
                    <AuthSignUpForm />
                </Box>
            </Paper>
        </Container>
    );
}
