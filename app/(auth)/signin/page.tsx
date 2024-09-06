import { Metadata } from "next";
import dynamic from "next/dynamic";

const SigninForm = dynamic(() => import("@/components/auth/SignIn"), { ssr: false });

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to your account"
}

export default function Page() {
    return <SigninForm />
}