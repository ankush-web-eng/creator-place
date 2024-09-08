'use client';

import { useCreator } from "@/context/CreatorContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function ProfileEdit() {

    const [fullName, setfullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPasssord] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const { creator, updateCreator } = useCreator();

    useEffect(() => {
        updateCreator();
        if (creator?.email) {
            setfullName(creator?.name);
            setEmail(creator.email);
            setPhone(creator?.phone || '');
        }
    }, [updateCreator, creator?.email, creator?.name, creator?.phone]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/update/personal', { fullName, email, password, phone });
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: response.data.message,
                    duration: 2000
                });
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    duration: 2000
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occured. Please try again later.",
                duration: 2000
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex md:w-[50%] w-full justify-center items-start md:mt-8 p-4">
            <div className="border-black border-2 rounded-xl p-6 flex flex-col w-full max-w-lg">
                <h1 className="text-2xl font-bold text-green-950 text-center mb-6">Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="font-semibold text-lg">
                            User Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Enter Full Name"
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-lg">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-lg">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPasssord(e.target.value)}
                        />
                    </div>
                    <span onClick={() => {
                        toast({
                            title: "In development",
                            description: "This feature is in development and will be available soon!",
                            duration: 2000
                        });
                    }} className="text-sm text-right font-semibold text-green-950 cursor-pointer hover:underline">
                        Reset your password
                    </span>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="font-semibold text-lg">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type='submit' className="border px-4 py-2 rounded-xl border-black text-center my-2 bg-green-900 text-white w-full flex items-center justify-center">
                        {loading ? <LuLoader className="animate-spin" /> : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
    
}