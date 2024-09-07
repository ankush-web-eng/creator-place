'use client';

import { useCreator } from "@/context/CreatorContext";
import ProfileAvatar from "./AvatarUpload";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';

const Links = [
    {
        name: 'Profile',
        path: '/profile/edit'
    },
    {
        name: 'My Store',
        path: '/profile/mystore'
    },
    {
        name: 'Earnings',
        path: '/profile/earnings'
    },
    {
        name: 'Address',
        path: '/profile/address'
    }
];

const DashboardLinks = () => {
    const pathname = usePathname();

    return (
        <div className="flex space-y-5 flex-col">
            {Links.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                    <Link 
                        key={index} 
                        href={link.path} 
                        className={`border px-4 py-2 rounded-xl text-center 
                        ${isActive ? 'bg-green-900 text-white' : 'border-black'}`}
                    >
                        {link.name}
                    </Link>
                );
            })}
            <button 
                onClick={() => signOut()} 
                className="border px-4 py-2 rounded-xl border-black text-center w-full my-2 bg-green-900 text-white"
            >
                Logout
            </button>
        </div>
    );
};

const DashboardLayout = () => {
    const { creator } = useCreator();

    return (
        <div className="md:w-[40%] h-screen flex items-center justify-center px-3 space-y-2 ml-6">
            <div className="w-fit border-2 p-12 border-black rounded-xl">
                <ProfileAvatar />
                <h1 className="text-3xl text-center mb-2 font-bold">{creator?.name}</h1>
                <DashboardLinks />
            </div>
        </div>
    );
};

export default DashboardLayout;