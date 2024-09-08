'use client';

import Image from 'next/image';
import React, { useMemo } from 'react';

interface StepProps {
    stepNumber: number;
    title: string;
    description: string;
    imageUrl: string;
    isLast: boolean;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description, imageUrl, isLast }) => {
    return (
        <div className="flex -row items-start mb-12 z-20 relative">
            <div className="flex-none w-12 mr-4 float-start">
                <div className="bg-[#003C3C] text-white w-12 h-12 flex justify-center items-center rounded-md text-xl font-bold relative z-10">
                    {stepNumber}
                </div>
                {!isLast && (
                    <div className="absolute left-10 top-12 w-[0.1rem] bg-[#003C3C] h-full -z-10" />
                )}
            </div>

            <div className="flex-grow max-md:hidden">

            </div>

            <div className="flex-col flex w-64 sm:w-48 md:w-80 bg-[#E5F0F1] rounded-xl p-4 md:p-12 md:mr-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <Image src={imageUrl} alt={title} className="w-full rounded-md shadow-md" width={256} height={256} unoptimized />
            </div>
        </div>
    );
};

const StepsTimeline: React.FC = () => {
    const steps = useMemo(() => [
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
    ], []);

    return (
        <div className="container mx-auto py-16 px-4 lg:px-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/3">
                <div className="bg-[#003C3C] p-4 flex flex-col space-y-5 w-full lg:w-fit h-fit rounded-xl lg:sticky lg:top-4">
                    <p className="text-white text-lg font-bold">Start Vybing with us!</p>
                    <p className="text-white">
                        &quot;We help influencers make money by monetizing their travel plans, merchandise, and digital goods and many more.&quot;
                    </p>
                    <button className="rounded-xl bg-green-500 text-black p-4 w-fit">Join us</button>
                </div>
            </div>

            <div className="relative lg:w-2/3">
                {steps.map((step, index) => (
                    <Step
                        key={step.stepNumber}
                        stepNumber={step.stepNumber}
                        title={step.title}
                        description={step.description}
                        imageUrl={step.imageUrl}
                        isLast={index === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepsTimeline;