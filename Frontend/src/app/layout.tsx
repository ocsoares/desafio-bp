import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import { AppThemeProvider } from "@/shared/providers/AppThemeProvider";
import { Copyright } from "@/shared/components/Copyright";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
    title: "Desafio BP",
    description: "App desafio bp full",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="pt-BR">
            <body style={{ position: "relative", minHeight: "97vh" }}>
                <AppThemeProvider>
                    <CssBaseline />
                    {children}
                    <Copyright />
                </AppThemeProvider>
            </body>
        </html>
    );
}
