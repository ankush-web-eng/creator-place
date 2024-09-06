'use client';

import { useCreator } from "@/context/CreatorContext";
import ProfileAvatar from "./AvatarUpload";
import Link from "next/link";

const Links = [
    {
        'name': 'Profile',
        'path': '/profile/edit'
    },
    {
        'name': 'My Store',
        'path': '/profile/mystore'
    },
    {
        'name': 'Earnings',
        'path': '/profile/earnings'
    },
    {
        'name': 'Address',
        'path': '/profile/address'
    }
]

const DashboardLinks = () => {
    return (
        <div className="flex space-y-3 flex-col">
            {Links.map((link, index) => {
                return <Link key={index} href={link.path} className={`border px-4 py-2 rounded-xl border-black ${window.location.pathname === link.path ? 'bg-green-500 text-white' : 'text-black bg-white'}`}>{link.name}</Link>
            })}
        </div>
    )
}

const DashboardLayout = () => {

    const { creator } = useCreator();

    return (
        <div className="w-fit h-screen border p-6 space-y-4">
            <ProfileAvatar />
            <h1 className="">{creator?.name}</h1>
            <DashboardLinks />
        </div>
    )
}

export default DashboardLayout;