import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "User product registration",
    description: "User product registration form",
};

export default function UserProductRegistrationLayout({
    children,
}: PropsWithChildren) {
    return children;
}
