import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata : Metadata = {
    title: "Earnings",
    description: "View your earnings",
}

const Earnings = dynamic(() => import('@/components/dashboard/WithdrawPage'), { ssr: false });

export default function Page(){
    return <Earnings />
}