'use client';

import { Creator } from "@/types/Creator";
import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface CreatorContextParams {
    creator: Creator | null;
    loading: boolean;
    updateCreator: () => Promise<void>;
}

const CreatorContext = createContext<CreatorContextParams | null>(null);

const CreatorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Added loading state

    const getCreator = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/creator");
            setCreator(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!creator) {
            getCreator();
        }
    }, [creator, getCreator]);

    const updateCreator = useCallback(async () => {
        await getCreator();
    }, [getCreator]);

    return (
        <CreatorContext.Provider value={{ creator, loading, updateCreator }}>
            {children}
        </CreatorContext.Provider>
    );
};

const useCreator = () => {
    const context = useContext(CreatorContext);
    if (!context) {
        throw new Error("useCreator must be used within a CreatorContextProvider");
    }
    return context;
};

export { CreatorContextProvider, useCreator };
