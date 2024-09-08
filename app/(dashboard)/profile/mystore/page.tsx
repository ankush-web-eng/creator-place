import StoreEdit from "@/components/dashboard/StoreEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Store",
    description: "Manage your store"
}

export default function Page() {
    return <StoreEdit />
}