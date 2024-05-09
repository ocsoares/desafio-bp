import { Typography } from "@mui/material";
import { PersonAddAlt1 } from "@mui/icons-material";
import { AppAvatar } from "../../../shared/components/AppAvatar";
import { AuthSignUpForm } from "./components/AuthSignUpForm";
import AppFormStyle from "@/shared/components/AppFormStyle";

export default function SignUpForm() {
    return (
        <AppFormStyle>
            <AppAvatar avatar={<PersonAddAlt1 color="secondary" />} />
            <Typography variant="h5">Cadastrar usuário</Typography>
            <AuthSignUpForm />
        </AppFormStyle>
    );
}
