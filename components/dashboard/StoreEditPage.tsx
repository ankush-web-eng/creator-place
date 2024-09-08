'use client';

import { useCreator } from "@/context/CreatorContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";

import { FaInstagram, FaYoutube } from "react-icons/fa";
import CoverPhoto from "@/components/dashboard/CoverUpload";

export default function StoreEdit() {

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
        <div className="min-h-screen w-full flex justify-center items-center px-4 md:px-0">
          <div className="border-black border-2 rounded-xl p-8 flex flex-col space-y-5 w-full max-w-md md:max-w-xl lg:max-w-2xl">
            <h1 className="text-2xl font-bold text-green-950 text-center">
              Creator Store
            </h1>
            <CoverPhoto />
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-3">
                <label htmlFor="social" className="font-semibold text-xl">
                  Link Social Media Account
                </label>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex items-center border-2 border-black rounded-xl p-2 space-x-3">
                    <FaInstagram size={28} />
                    <input
                      type="text"
                      name="instagramFollowers"
                      id="instagramFollowers"
                      className="flex-1 rounded-xl px-4 py-2 border-2 border-black"
                      placeholder="Instagram Followers"
                      value={instaFollowers}
                      onChange={(e) => setInstaFollowers(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border-2 border-black rounded-xl p-2 space-x-3">
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      className="flex-1 rounded-xl px-4 py-2 border-2 border-black"
                      placeholder="Instagram ID"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex items-center border-2 border-black rounded-xl p-2 space-x-3">
                    <FaYoutube size={28} />
                    <input
                      type="text"
                      name="youtubeSubscribers"
                      id="youtubeSubscribers"
                      className="flex-1 rounded-xl px-4 py-2 border-2 border-black"
                      placeholder="YouTube Subscribers"
                      value={youtubeSubscribers}
                      onChange={(e) => setYoutubeSubscribers(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border-2 border-black rounded-xl p-2 space-x-3">
                    <input
                      type="text"
                      name="youtube"
                      id="youtube"
                      className="flex-1 rounded-xl px-4 py-2 border-2 border-black"
                      placeholder="YouTube ID"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                    />
                  </div>
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
    
              <button
                type="submit"
                className="border px-4 py-2 rounded-xl border-black text-center mt-4 bg-green-900 text-white w-full flex items-center justify-center"
              >
                {loading ? <LuLoader className="animate-spin" /> : "Save"}
              </button>
            </form>
          </div>
        </div>
      );
}