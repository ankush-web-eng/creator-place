'use client';

import { useCreator } from "@/context/CreatorContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function AddressEdit() {
    const [appartment, setAppartment] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const { creator, updateCreator } = useCreator();
    const { data: session } = useSession();

    const email = session?.user?.email;

    useEffect(() => {
        updateCreator();
    }, [updateCreator]);

    useEffect(() => {
        if (creator?.email) {
            setAppartment(creator?.Address?.appartment || '');
            setArea(creator?.Address?.area || '');
            setZip(creator?.Address?.zip || '');
            setCity(creator?.Address?.city || '');
            setState(creator?.Address?.state || '');
            setCountry(creator?.Address?.country || '');
        }
    }, [creator]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/update/address', { email, appartment, area, zip, city, state, country });
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
        }
        catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again later.",
                duration: 2000
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full md:w-[50%] flex justify-center items-center px-4">
          <div className="border-black border-2 rounded-xl px-8 py-6 flex space-y-5 flex-col w-full max-w-lg">
            <h1 className="text-2xl font-bold text-green-950">Address</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="appartment" className="font-semibold text-xl">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="appartment"
                  id="appartment"
                  className="rounded-xl px-4 py-2 border-2 border-black"
                  placeholder="Enter Address"
                  value={appartment}
                  onChange={(e) => setAppartment(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="area" className="font-semibold text-xl">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="area"
                  id="area"
                  className="rounded-xl px-4 py-2 border-2 border-black"
                  placeholder="Enter address"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="zip" className="font-semibold text-xl">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    className="rounded-xl px-4 py-2 border-2 border-black"
                    placeholder="Enter zip code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="city" className="font-semibold text-xl">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="rounded-xl px-4 py-2 border-2 border-black"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="state" className="font-semibold text-xl">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="rounded-xl px-4 py-2 border-2 border-black"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="country" className="font-semibold text-xl">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="rounded-xl px-4 py-2 border-2 border-black"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="border px-4 py-2 rounded-xl border-black text-center my-2 bg-green-900 text-white flex items-center justify-center w-full md:w-1/3"
              >
                {loading ? <LuLoader className="animate-spin" /> : "Save"}
              </button>
            </form>
          </div>
        </div>
      );
      
}
