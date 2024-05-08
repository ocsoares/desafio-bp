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
            <div>
                <h2>FAZER...</h2>
            </div>
        </>
    );
}
