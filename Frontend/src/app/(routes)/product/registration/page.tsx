import { AppAvatar } from "@/shared/components/AppAvatar";
import { AddShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import ProductRegistrationForm from "./components/ProductRegistrationForm";
import AppFormStyle from "@/shared/components/AppFormStyle";

export default function ProductRegistration() {
    return (
        <AppFormStyle>
            <AppAvatar avatar={<AddShoppingCart color="secondary" />} />
            <Typography variant="h5">Cadastrar produto</Typography>
            <ProductRegistrationForm />
        </AppFormStyle>
    );
}
