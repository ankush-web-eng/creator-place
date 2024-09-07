import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from 'react-icons/fa';
import { useToast } from "@/hooks/use-toast";
import { LuLoader2 } from "react-icons/lu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import axios from "axios";
import { useCreator } from "@/context/CreatorContext";

export default function ProfileAvatar() {
    const { data: session } = useSession();
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [loading, setLoading] = useState(false);
    const { creator, updateCreator } = useCreator();
    const imageRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!creator?.image) {
            updateCreator();
        }
        setImageSrc(creator?.image as string);
    }, [creator?.image, updateCreator]);

    const handleClick = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith('image/')) {
            return toastError('Please upload an image file');
        }
        if (selectedFile.size > 1024 * 1024) {
            return toastError('File size should be less than 1MB');
        }

        setLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target?.result) {
                setImageSrc(e.target.result as string);

                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('email', session?.user?.email as string);

                try {
                    const response = await axios.post('/api/photoUpload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        toast({
                            title: 'Success',
                            description: 'Profile picture updated successfully',
                            duration: 2000,
                        });
                    } else {
                        toastError('Failed to update profile picture');
                    }
                } catch (error) {
                    toastError('Failed to upload image');
                }
                setLoading(false);
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    const toastError = (message: string) => {
        toast({
            title: 'Error',
            description: message,
            duration: 2000,
            variant: 'destructive',
        });
        setLoading(false);
    };

    return (
        <div className="flex items-center space-x-6 flex-col space-y-6 p-6 justify-center w-full">
            <div className="rounded-full h-12 w-12 flex justify-center items-center">
                <div className="border rounded-full p-8">
                    {imageSrc ? (
                        <Image
                            src={imageSrc as string}
                            alt={creator?.name || "User"}
                            width={48}
                            height={48}
                            className="rounded-full"
                            unoptimized
                        />
                    ) : (
                        <Avatar>
                            <AvatarFallback className="bg-white">{session?.user?.name?.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
            <input
                ref={imageRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500">
                {loading ? (
                    <LuLoader2 className="animate-spin text-indigo-500 h-6 w-6" />
                ) : (
                    <button type="button" onClick={handleClick} className="bg-white rounded-full p-1 flex space-x-2 hover:text-indigo-400 items-center justify-center">
                        <FaRegEdit color="blue" />
                        <span>Change profile picture</span>
                    </button>
                )}
            </p>
        </div>
    );
}
