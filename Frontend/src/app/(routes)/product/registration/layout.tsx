import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Product registration",
    description: "Product registration form",
};

export default function ProductRegistrationLayout({
    children,
}: PropsWithChildren) {
    return children;
}
