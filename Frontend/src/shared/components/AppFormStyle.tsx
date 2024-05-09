import { Container, Paper, Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function AppFormStyle({
    children,
}: Readonly<PropsWithChildren>) {
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
                    {children}
                </Box>
            </Paper>
        </Container>
    );
}
