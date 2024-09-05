'use client';

import Image from 'next/image';
import React from 'react';

interface StepProps {
    stepNumber: number;
    title: string;
    description: string;
    imageUrl: string;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description, imageUrl }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-start mb-12 lg:mb-6 z-50">
            <div className="lg:w-1/6 flex justify-center lg:justify-start mb-4 lg:mb-0">
                <div className="bg-green-800 text-white w-12 h-12 flex justify-center items-center rounded-full text-xl font-bold">
                    {stepNumber}
                </div>
            </div>

            <div className="lg:w-5/6 flex flex-col lg:flex-row lg:space-x-1 items-center lg:items-start">
                <div className="flex-1 lg:pr-8">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-gray-700 mb-4">{description}</p>
                </div>

                <div className="w-fit lg:w-auto mt-4 lg:mt-0 bg-teal-50 rounded-xl p-8">
                    <Image src={imageUrl} alt={title} className="w-64 lg:w-60 rounded-md shadow-md" width={100} height={100} />
                </div>
            </div>
        </div>
    );
};

const StepsTimeline: React.FC = () => {
    const steps = [
        {
            stepNumber: 1,
            title: "Sign Up and create your own store hassle-free",
            description: "Log in and easily start setting up your personalized store...",
            imageUrl: "/login.png",
        },
        {
            stepNumber: 2,
            title: "Build & customize your store front",
            description: "Start designing your store and add products.",
            imageUrl: "/details.png",
        },
        {
            stepNumber: 3,
            title: "Add products to your store & easily integrate social media",
            description: "Integrate your store with social media platforms to promote products.",
            imageUrl: "/insta.png",
        },
        {
            stepNumber: 4,
            title: "Monetize your influence, earn revenue and track your success",
            description: "Easily track earnings and product performance with detailed analytics.",
            imageUrl: "/earning.png",
        },
    ];

    return (
        <div className="container mx-auto py-16 px-4 lg:px-8">

            <div className='flex flex-col lg:flex-row space-x-2'>
                <div className='bg-green-800 p-4 flex flex-col space-x-5 w-fit h-fit lg:w-1/3 rounded-xl items-start space-y-5'>
                    <p className='text-white text-lg font-bold'>Start Vybing with us!</p>
                    <p className='text-white'>&quot;We help influencers mkae money by monetizing their travel plans, merchandise, and digital goods and many more.&quot;</p>
                    <button className='rounded-xl bg-green-500 text-black p-4 w-fit'>Join us</button>
                </div>
                <div className="relative">
                    <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-1 bg-green-200 -z-10" />
                    {steps.map((step) => (
                        <Step
                            key={step.stepNumber}
                            stepNumber={step.stepNumber}
                            title={step.title}
                            description={step.description}
                            imageUrl={step.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepsTimeline;
