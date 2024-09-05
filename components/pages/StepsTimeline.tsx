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
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-12 lg:mb-16">
            {/* Step Number */}
            <div className="lg:w-1/6 flex justify-center lg:justify-start mb-4 lg:mb-0">
                <div className="bg-green-700 text-white w-12 h-12 flex justify-center items-center rounded-full text-xl font-bold">
                    {stepNumber}
                </div>
            </div>
            
            {/* Step Content */}
            <div className="lg:w-5/6 flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-start">
                <div className="flex-1 lg:pr-8">
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    {/* Description */}
                    <p className="text-gray-700 mb-4">{description}</p>
                </div>

                {/* Image */}
                <div className="w-full lg:w-auto mt-4 lg:mt-0">
                    <Image src={imageUrl} alt={title} className="w-64 lg:w-auto rounded-md shadow-md" width={100} height={100} />
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
            imageUrl: "/path-to-image1.png", // Update with your actual image path
        },
        {
            stepNumber: 2,
            title: "Build & customize your store front",
            description: "Start designing your store and add products.",
            imageUrl: "/path-to-image2.png",
        },
        {
            stepNumber: 3,
            title: "Add products to your store & easily integrate social media",
            description: "Integrate your store with social media platforms to promote products.",
            imageUrl: "/path-to-image3.png",
        },
        {
            stepNumber: 4,
            title: "Monetize your influence, earn revenue and track your success",
            description: "Easily track earnings and product performance with detailed analytics.",
            imageUrl: "/path-to-image4.png",
        },
    ];

    return (
        <div className="container mx-auto py-16 px-4 lg:px-8">
            {/* Section Title */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">Start Vibing with us!</h2>
                <p className="text-lg mt-4">Your journey to becoming an influencer starts here.</p>
                <button className="mt-6 bg-green-700 text-white py-2 px-6 rounded-full">Join Us</button>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-1 bg-green-200" />
                {/* Steps */}
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
    );
};

export default StepsTimeline;
