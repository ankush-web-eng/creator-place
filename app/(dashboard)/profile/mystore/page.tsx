'use client';

import { useCreator } from "@/context/CreatorContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";

import { FaInstagram, FaYoutube } from "react-icons/fa";
import CoverPhoto from "@/components/dashboard/CoverUpload";

export default function Page() {

    const [url, setUrl] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [pan, setPan] = useState<string>('');
    const [gst, setGst] = useState<string>('');
    const [instagram, setInstagram] = useState<string>('');
    const [youtube, setYoutube] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [instaFollowers, setInstaFollowers] = useState<string>('');
    const [youtubeSubscribers, setYoutubeSubscribers] = useState<string>('');

    const { toast } = useToast();
    const { creator, updateCreator } = useCreator();
    const { data: session } = useSession();

    const email = session?.user?.email

    useEffect(() => {
        updateCreator();
    }, [updateCreator]);

    useEffect(() => {
        if (creator?.email) {
            setUrl(creator?.CreatorStore.url || '');
            setGenre(creator?.CreatorStore.genre || '');
            setAccount(creator?.Bank.account || '');
            setPan(creator?.Bank.pan || '');
            setGst(creator?.Bank.gst || '');
            setInstagram(creator?.CreatorStore.instagram || '');
            setYoutube(creator?.CreatorStore.youtube || '');
            setInstaFollowers(localStorage.getItem('instaFollowers') ? localStorage.getItem('instaFollowers') || '' : '0');
            setYoutubeSubscribers(localStorage.getItem('youtubeSubscribers') ? localStorage.getItem('youtubeSubscribers') || '' : '0');
        }
    }, [creator]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            localStorage.removeItem('instaFollowers');
            localStorage.removeItem('youtubeSubscribers');
            localStorage.setItem('instaFollowers', instaFollowers.toString());
            localStorage.setItem('youtubeSubscribers', youtubeSubscribers.toString());
            const response = await axios.post('/api/update/store', { email, instagram, youtube, url, genre, account, pan, gst });
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
        <div className="min-h-screen w-[40%] flex justify-center items-center">
            <div className="border-black border-2 rounded-xl px-8 py-6 flex space-y-5 flex-col w-full">
                <h1 className="text-2xl font-bold text-green-950">Creator Store</h1>
                <CoverPhoto />
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2" >
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="socail" className="font-semibold text-xl">
                            Link Social Media Account
                        </label>
                        <div className="w-fit py-2 px-3 flex space-x-3 items-center border-2 border-black rounded-xl">
                            <FaInstagram size={28} />
                            <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                className="rounded-xl px-4 py-2 border-2 border-black"
                                placeholder="Instagram'Id"
                                value={instaFollowers}
                                onChange={(e) => setInstaFollowers(e.target.value)}
                            />
                            <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                className="rounded-xl px-4 py-2 border-2 border-black"
                                placeholder="Instagram'Id"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="w-fit py-2 px-3 flex space-x-3 items-center border-2 border-black rounded-xl">
                            <FaYoutube size={28} />
                            <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                className="rounded-xl px-4 py-2 border-2 border-black"
                                placeholder="Instagram'Id"
                                value={youtubeSubscribers}
                                onChange={(e) => setYoutubeSubscribers(e.target.value)}
                            />
                            <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                className="rounded-xl px-4 py-2 border-2 border-black"
                                placeholder="Youtube'Id"
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="url" className="font-semibold text-xl">
                            Claim Your Store URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            id="url"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Username For Store"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="genre" className="font-semibold text-xl">
                            Select Genre
                        </label>
                        <input
                            type="text"
                            name="genre"
                            id="genre"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="Enter Your Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="account" className="font-semibold text-xl">
                            Add Your Bank Details
                        </label>
                        <input
                            type="text"
                            name="account"
                            id="account"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="xxxxxxxxxxxxxx"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="pan" className="font-semibold text-xl">
                            Add PAN Card Number
                        </label>
                        <input
                            type="text"
                            name="pan"
                            id="pan"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="xxxxxxxxxxxxxxxxx"
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="gst" className="font-semibold text-xl">
                            GST Invoicing
                        </label>
                        <input
                            type="text"
                            name="gst"
                            id="gst"
                            className="rounded-xl px-4 py-2 border-2 border-black"
                            placeholder="xxxxxxxxxxxxxxxxx"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                        />
                    </div>
                    <button type='submit' className="border px-4 py-2 rounded-xl border-black text-center my-2 bg-green-900 text-white w-[40%] flex items-center justify-center">{loading ? <LuLoader className="animate-spin" /> : "Save"}</button>
                </form>
            </div>
        </div>
    )
}