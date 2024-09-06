'use client';

import { Creator } from "@/types/Creator";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface CreatorContextParams {
    creator: Creator | null;
    updateCreator: () => void;
}

const CreatorContext = createContext<CreatorContextParams | null>(null);

const CreatorContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [creator, setCreator] = useState<Creator | null>(null);

    const getCreator = async () => {
        try {
            const res = await axios.get("/api/creator");
            setCreator(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCreator();
    }, []);

    const updateCreator = () => {
        getCreator();
    }

    return (
        <CreatorContext.Provider value={{ creator, updateCreator }}>
            {children}
        </CreatorContext.Provider>
    )
}

const useCreator = () => {
    const context = useContext(CreatorContext);
    if (!context) {
        throw new Error("useCreator must be used within a CreatorContextProvider");
    }
    return context;
}

export { CreatorContextProvider, useCreator };