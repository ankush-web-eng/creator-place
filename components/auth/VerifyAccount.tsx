import { useForm } from "react-hook-form";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import * as z from "zod";

import { VerifySchema } from "@/schema/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";

type VerifyFormData = z.infer<typeof VerifySchema>;

const VerifyAccount = () => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<VerifyFormData>({
        resolver: zodResolver(VerifySchema),
    });

    const onSubmit = async (data: VerifyFormData) => {
        setIsSubmitting(true);
        const signupData = localStorage.getItem('signupData');
        try {
            if (signupData) {
                const parsedData = JSON.parse(signupData);
                const formData = { ...parsedData, ...data };
                console.log(formData);
                const response = await axios.post('/api/signup', formData);
                if (response.status === 201) {
                    alert('Account created successfully');
                    localStorage.removeItem('signupData');
                    setSuccess(true);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 100);
                }
            } else {
                throw new Error('Signup data not found');
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return <SuccessForm />;
    }

    return (
        <div className="flex min-h-screen items-start">
            <div className="m-auto bg-white p-8 rounded-lg shadow-md w-96 border border-black">
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className='flex space-x-2 items-center'>
                        <FaInstagram className="text-2xl text-red-500" />
                        <label htmlFor="instagram" className="text-sm font-medium text-gray-700 block">Instagram</label>
                        <input
                            {...register('instagram')}
                            type="text"
                            id="instagram"
                            className="mt-1 block w-full rounded-3xl border border-black px-3 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Instagram handle"
                        />
                        {errors.instagram && <span className="text-red-500 text-sm">Instagram handle is required</span>}
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <FaYoutube className="text-2xl text-red-500" />
                        <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">YouTube</label>
                        <input
                            {...register('youtube')}
                            type="text"
                            id="youtube"
                            className="mt-1 block w-full rounded-3xl border border-black px-3 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="YouTube channel"
                        />
                        {errors.youtube && <span className="text-red-500 text-sm">YouTube channel is required</span>}
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className='px-3 py-1 bg-teal-900 text-white rounded-full flex items-center justify-center'
                        >
                            {isSubmitting ? <LuLoader className="animate-spin" /> : 'Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SuccessForm = () => {
    return (
        <div className="flex min-h-screen items-start">
            <div className="m-auto bg-white p-8 rounded-lg shadow-md w-96 border space-y-3 border-black">
                <h2 className="text-2xl font-bold mb-6 text-center">Congratulations!</h2>
                <div className="flex flex-col">
                    <h2 className="text-sm text-center">Now You&apos;re a verified</h2>
                    <h2 className="text-sm text-center">Creator</h2>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        className='px-3 py-1 bg-teal-900 text-white rounded-full flex items-center justify-center'
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount;