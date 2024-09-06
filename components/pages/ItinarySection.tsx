import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ItineraryProps {
    title: string;
    description: string;
    price: number;
    images: string[];
}

const Itinerary: React.FC<ItineraryProps> = ({ title, description, price, images }) => {
    return (
        <div className="bg-teal-50 p-16 rounded-lg">
            <div className="flex justify-between items-center mb-4 py-4">
                <h1 className="text-3xl font-bold">Products</h1>
                <div>
                    <button className="bg-white text-gray-700 px-4 py-2 rounded-md mr-2 border-2">Itinerary</button>
                    <button className="bg-teal-700 text-white px-4 py-2 rounded-md">Demo Store</button>
                </div>
            </div>

            <div className="flex items-center py-8 justify-center">
                <button className="bg-teal-700 text-white p-2 rounded-full mr-4">
                    <ChevronLeft size={24} />
                </button>

                <div className="flex-grow py-6 px-3">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-600 mb-4">{description}</p>

                    <div className="flex items-center mb-4 py-6">
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md mr-2">Rs. {price}</span>
                        <button className="bg-teal-700 text-white px-4 py-1 rounded-md">More</button>
                    </div>
                </div>

                <div className="relative w-1/3">
                    <Image src={images[0]} alt="Delhi" width={40} height={40} className="w-full z-20 h-40 object-cover rounded-lg" />
                    <Image src={images[1]} alt="Delhi" width={40} height={40} className="w-3/4 h-32 object-cover rounded-lg absolute -bottom-4 z-0 -left-4" />
                </div>

                <button className="bg-teal-700 text-white p-2 rounded-full ml-4">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

const ItinarySection = () => {
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

export default ItinarySection