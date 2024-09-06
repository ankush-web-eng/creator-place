import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignupForm = dynamic(() => import("@/components/auth/SignUp"), { ssr: false });

export const metdadata: Metadata = {
    title: "Sign Up",
    description: "Sign up to create an account"
}

export default function Page() {
    return <SignupForm />
}