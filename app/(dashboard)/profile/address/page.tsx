import AddressEdit from "@/components/dashboard/AddressEditPage";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Address",
    description: "Edit your address"
}

export default function Page(){
    return <AddressEdit />
}