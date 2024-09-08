import React from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface ItineraryProps {
    title: string;
    description: string;
    price: number;
    images: string[];
}

const Itinerary: React.FC<ItineraryProps> = ({ title, description, price, images }) => {
    return (
        <div className="flex flex-col space-y-3 bg-[#E5F0F1] p-4 sm:p-6 md:p-8 lg:p-16 rounded-lg">
            <div className="flex justify-between items-center mb-4 py-2 w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Products</h1>
                <div className='flex'>
                    <button className="bg-white text-gray-700 text-xs sm:text-sm md:text-base p-1 sm:px-2 md:px-4 sm:py-1 md:py-2 rounded-md mr-2 border-2">Itinerary</button>
                    <button className="bg-[#003C3C] text-white text-xs sm:text-sm md:text-base p-1 sm:px-2 md:px-4 sm:py-1 md:py-2 rounded-md">Demo Store</button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-[#003C3C] text-white p-1 sm:p-2 rounded-full">
                    <FaArrowLeft size={16} className="sm:w-6 sm:h-6" />
                </button>

                <div className="flex-grow px-2 sm:px-4 max-w-[60%]">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">{title}</h2>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 max-md:hidden">{description}</p>
                    <p className="md:hidden text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">{description.slice(0, 100)}...</p>

                    <div className="flex items-center mt-2 sm:mt-4">
                        <span className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-2 py-1 rounded-md mr-2">Rs. {price}</span>
                        <button className="bg-[#003C3C] text-white text-xs sm:text-sm px-2 sm:px-4 py-1 rounded-md">More</button>
                    </div>
                </div>

                <div className="relative w-24 sm:w-32 md:w-40 lg:w-48">
                    <Image src={images[0]} alt="Delhi" width={200} height={200} className="w-full h-auto object-cover rounded-lg" />
                    <Image src={images[1]} alt="Delhi" width={200} height={200} className="w-full h-auto object-cover rounded-lg absolute -bottom-4 sm:-bottom-6 md:-bottom-8 z-0 -left-4 sm:-left-6 md:-left-8" />
                </div>

                <button className="bg-[#003C3C] text-white p-1 sm:p-2 rounded-full">
                    <FaArrowRight size={16} className="sm:w-6 sm:h-6" />
                </button>
            </div>
        </div>
    );
};

const ItinerarySection = () => {
    const delhiImages = [
        "/lotus_temple.png",
        "/india_gate.png",
    ];

    return (
        <Itinerary
            title="Delhi Itinerary"
            description="Delhi, India's capital territory, is a massive metropolitan area in the country's north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people."
            price={349}
            images={delhiImages}
        />
    );
}

export default ItinerarySection;