import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-auto flex flex-col items-center justify-center py-20 bg-white">
            <div className="relative flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-8">

                <div className="cloud bg-white shadow-lg p-6 rounded-full relative">
                    <span className="text-lg font-bold text-center block">India&apos;s first marketplace for</span>
                    <span className="text-xl font-bold text-green-600 block">Influencers</span>
                </div>

                <div className="cloud bg-white shadow-lg p-6 rounded-full relative">
                    <span className="text-lg font-bold text-center block">Earn via listing your</span>
                    <span className="text-xl font-bold text-yellow-600 block">products</span>
                </div>

                <div className="cloud bg-white shadow-lg p-6 rounded-full relative">
                    <span className="text-lg font-bold text-center block">0% Commission &</span>
                    <span className="text-xl font-bold text-red-600 block">On-Boarding Fee</span>
                </div>
            </div>

            <div className="relative mt-8 lg:mt-12">
                <Image
                    src="/path-to-your-image.png"
                    alt="Influencer"
                    width={250}
                    height={250}
                    className="rounded-full shadow-lg"
                />
            </div>

            <div className="relative w-full mt-8 lg:mt-12 flex justify-center">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                    <div className="text-center">
                        <Image
                            src="/path-to-travel-icon.png"
                            alt="Travel Itinerary"
                            width={60}
                            height={60}
                            className="mx-auto"
                        />
                        <p className="font-semibold mt-2">Travel Itinerary</p>
                    </div>

                    <div className="text-center">
                        <Image
                            src="/path-to-merch-icon.png"
                            alt="Custom Merchandise"
                            width={60}
                            height={60}
                            className="mx-auto"
                        />
                        <p className="font-semibold mt-2">Custom Merchandise</p>
                    </div>

                    <div className="text-center">
                        <Image
                            src="/path-to-digital-content-icon.png"
                            alt="Digital Content"
                            width={60}
                            height={60}
                            className="mx-auto"
                        />
                        <p className="font-semibold mt-2">Digital Content</p>
                    </div>

                    <div className="text-center">
                        <Image
                            src="/path-to-fashion-icon.png"
                            alt="Fashion Brands"
                            width={60}
                            height={60}
                            className="mx-auto"
                        />
                        <p className="font-semibold mt-2">Fashion Brands</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
