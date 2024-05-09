import { AppAvatar } from "@/shared/components/AppAvatar";
import { AssignmentInd } from "@mui/icons-material";
import { Typography } from "@mui/material";
import AppFormStyle from "@/shared/components/AppFormStyle";
import UserProductRegistrationForm from "./components/UserProductRegistrationForm";

export default function UserProductRegistration() {
    return (
        <AppFormStyle>
            <AppAvatar avatar={<AssignmentInd color="secondary" />} />
            <Typography variant="subtitle1">
                Cadastrar produto para um usuário
            </Typography>
            <UserProductRegistrationForm />
        </AppFormStyle>
    );
}
