import ProfileEdit from "@/components/dashboard/ProfileEditPage";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Edit Profile",
    description: "Edit your profile information"
}

export default function Page(){
    return <ProfileEdit />
}