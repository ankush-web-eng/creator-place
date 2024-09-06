import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react";

import { FaRegEdit } from 'react-icons/fa';
import { useToast } from "@/hooks/use-toast";
import { LuLoader2 } from "react-icons/lu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import axios from "axios";

export default function ProfileAvatar() {

    const { data: session } = useSession();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [response, setResponse] = useState<boolean>(false);
    // const [file, setFile] = useState<File | null>(null);

    const imageRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast()

    const handleClick = async () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

    const getUser = async () => {
        try {
            const res = await axios.get('/api/user');
            if (res.status === 200) {
                setImageSrc(res.data.user.image);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setResponse(true);

        if (!selectedFile.type.startsWith('image/')) {
            toast({
                title: 'Error',
                description: 'Please upload an image file',
                duration: 2000,
                variant: 'destructive'
            });
            setResponse(false);
            return;
        }

        if (selectedFile.size > 1024 * 1024) {
            toast({
                title: 'Error',
                description: 'File size should be less than 1MB',
                duration: 2000,
                variant: 'destructive'
            })
            setResponse(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result ?? null);
            const img = new window.Image();
            img.onload = () => {
                setResponse(false);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
        // setFile(selectedFile);

        setResponse(true)
        const formdata = new FormData();
        formdata.append('file', selectedFile as File);
        formdata.append('email', session?.user?.email as string);
        const response = await axios.post('/api/photoUpload', formdata, {
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
            toast({
                title: 'Error',
                description: 'Failed to update profile picture',
                duration: 2000,
                variant: 'destructive'
            });
        }
        setResponse(false);
    };


    return (
        <div className="flex items-center space-x-6 flex-col space-y-3">
            <div className="relative h-12 w-12">
                <div className="h-24 w-24 rounded-full overflow-hidden">
                    {imageSrc ? (
                        <Image
                            src={imageSrc as string}
                            alt={session?.user?.name as string}
                            width={48}
                            height={48}
                            className="object-cover"
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
            <p className="text-sm text-gray-500">{response ? (
                <LuLoader2 className="animate-spin text-indigo-500 h-6 w-6" />
            ) : (
                <button type="button" onClick={handleClick} className="bg-indigo-100 rounded-full p-1 flex space-x-2">
                    <FaRegEdit color="blue" />
                    <span>Change profile picture</span>
                </button>
            )}</p>
        </div>
    )
}