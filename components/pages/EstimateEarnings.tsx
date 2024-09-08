'use client';
import React, { useState } from 'react';

interface FollowerCountProps {
    followers: number;
}

const formatFollowerCount = (count: number): string => {
    if (count >= 1000000) {
        return parseInt((count / 1000000).toFixed(1)) + 'M';
    } else if (count >= 1000) {
        return parseInt((count / 1000).toFixed(1)) + 'k';
    } else {
        return count.toString();
    }
};

const FollowerCount: React.FC<FollowerCountProps> = ({ followers }) => {
    const formattedCount = formatFollowerCount(followers);

    return (
        <div className="text-center">
            {formattedCount}
        </div>
    );
};

const EstimateEarnings: React.FC = () => {
    const [followers, setFollowers] = useState(500000);
    const [products, setProducts] = useState(25);
    const [monthlyEarning, setMonthlyEarning] = useState(12000);
    const [yearlyEarning, setYearlyEarning] = useState(144000);

    const handleCalculate = () => {
        let baseEarnings = 0;
    
        if (followers >= 10000) {
            baseEarnings = (followers / 10000) * 1000;
        }
    
        let productMultiplier = 0;
        if (products >= 1) {
            productMultiplier = baseEarnings * products;
        }
    
        let calculatedMonthlyEarning = productMultiplier;
        if (followers >= 20000 && products >= 2) {
            calculatedMonthlyEarning += (followers / 10000 - 2) * 500;
        }
    
        const calculatedYearlyEarning = calculatedMonthlyEarning * 12;
    
        setMonthlyEarning(Math.round(calculatedMonthlyEarning));
        setYearlyEarning(Math.round(calculatedYearlyEarning));
    };
    

    return (
        <div suppressHydrationWarning className="bg-[#E5F0F1] p-8 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex flex-col w-full lg:w-2/3 space-y-6">
                    <h2 className="text-3xl font-bold text-center lg:text-left">Estimate Earning Potential</h2>

                    <div className="mb-6">
                        <label className="block text-lg mb-2">What kind of influencer are you?</label>
                        <select className="w-full p-3 border rounded-lg" defaultValue="">
                            <option value="" disabled>
                                Select influencer type
                            </option>
                            <option value="micro">Micro-Influencer</option>
                            <option value="macro">Macro-Influencer</option>
                            <option value="mega">Mega-Influencer</option>
                        </select>
                    </div>

                    <div className="mb-6 flex flex-col justify-center items-center">
                        <label className="block text-lg mb-2">How many followers do you have?</label>
                        <input
                            type="range"
                            min="10000"
                            max="1000000"
                            step="10000"
                            value={followers}
                            onChange={(e) => setFollowers(Number(e.target.value))}
                            className="w-full range-input"
                        />
                        <div className="text-center mt-2 shadow-xl drop-shadow-xl rounded-xl bg-white w-fit p-2"><FollowerCount followers={followers} /></div>
                    </div>

                    <div className="mb-6 flex flex-col justify-center items-center">
                        <label className="block text-lg mb-2">How many products do you list monthly?</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={products}
                            onChange={(e) => setProducts(Number(e.target.value))}
                            className="w-full range-input"
                        />
                        <div className="text-center mt-2 shadow-xl drop-shadow-xl rounded-xl bg-white w-fit p-2">{products} Products</div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="bg-[#003C3C] text-white font-bold py-3 px-8 rounded-lg w-full lg:w-fit"
                    >
                        Calculate
                    </button>
                </div>

                <div className="w-full lg:w-1/3 p-8 rounded-lg flex flex-col max-md:flex-row max-md:space-x-3 justify-center items-center">
                    <div className="flex flex-col items-center mb-6">
                        <h3 className="text-xl font-semibold">Monthly Earning</h3>
                        <p className="text-3xl font-bold text-[#003C3C]">₹{monthlyEarning.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">Yearly Earning</h3>
                        <p className="text-3xl font-bold text-[#003C3C]">₹{yearlyEarning.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimateEarnings;
