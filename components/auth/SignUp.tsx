'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import * as z from 'zod';

import VerifyAccount from './VerifyAccount';
import { signupSchema } from '@/schema/signupSchema';

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    localStorage.setItem('signupData', JSON.stringify(data));
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <VerifyAccount />;
  }

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
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-2xl font-semibold text-gray-900">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-xl border p-3"
                  placeholder="Enter full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
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

              <div className="flex items-center text-lg">
                <input
                  {...register('isCreator')}
                  type="checkbox"
                  id="isCreator"
                  className="rounded h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <label htmlFor="isCreator" className="ml-2 block text-lg text-gray-900">Are You A Creator?</label>
              </div>

              <div className='flex justify-center'>
                <button
                  type="submit"
                  className='w-fit px-3 py-1 rounded-full border border-black'
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
