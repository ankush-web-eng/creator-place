'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import * as z from 'zod';

import { FaGoogle } from 'react-icons/fa';

import { signinSchema } from '@/schema/SignInSchema';
import { LuLoader } from 'react-icons/lu';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

type SignupFormData = z.infer<typeof signinSchema>;

const SignupForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            console.log("data: ", data);
            console.log("data: ", data.email, data.password);
            const result = await signIn('credentials', {
                redirect: false,
                identifier: data.email,
                password: data.password,
            });
            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast({
                        title: 'Login Failed',
                        description: 'Incorrect username or password',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: result.error,
                        variant: 'destructive',
                    });
                }
            }
            if (result?.url) {
                setIsSubmitted(true);

            }
        } catch {
            toast({
                title: 'Error',
                description: 'Server Error occurred. Please try again after some time.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" rounded-lg overflow-hidden w-full max-w-5xl p-4">
                <div className="flex space-x-6">
                    <div className="hidden md:block md:w-1/2 bg-gray-100">
                        <Image
                            src="/login_photo.png"
                            alt="Signup illustration"
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                            unoptimized
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            <div className='py-4 flex justify-center items-center'>
                                <button onClick={() => signIn('google')} className='flex space-x-2 px-3 py-2 rounded-xl items-center border border-black w-full justify-center'>
                                    <FaGoogle className='text-2xl' />
                                    <span className='text-lg font-semibold'>Sign in with Google</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-center my-4">
                                <hr className="w-full border-gray-300" />
                                <span className="mx-3 text-gray-500">OR</span>
                                <hr className="w-full border-gray-300" />
                            </div>


                            <div>
                                <label htmlFor="email" className="block text-2xl font-semibold text-gray-900">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl border p-3"
                                    placeholder="Enter email"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-2xl font-semibold text-gray-900">
                                    Password
                                </label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    id="password"
                                    className="mt-1 block w-full border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl border p-3"
                                    placeholder="Enter password"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>

                            <div className='flex justify-center'>
                                <button
                                    type="submit"
                                    className='w-fit px-3 py-1 rounded-full border border-black'
                                >
                                    {isSubmitted ? <LuLoader className='animate-spin' /> : 'Login'}
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Already have an account? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
