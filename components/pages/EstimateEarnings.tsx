'use client';
import React, { useState } from 'react';

const EstimateEarnings: React.FC = () => {
    const [followers, setFollowers] = useState(500000);
    const [products, setProducts] = useState(25);
    const [monthlyEarning, setMonthlyEarning] = useState(12000);
    const [yearlyEarning, setYearlyEarning] = useState(144000);

    const handleCalculate = () => {
        const calculatedMonthlyEarning = (followers / 1000) * products * 2;
        const calculatedYearlyEarning = calculatedMonthlyEarning * 12;

        setMonthlyEarning(Math.round(calculatedMonthlyEarning));
        setYearlyEarning(Math.round(calculatedYearlyEarning));
    };

    return (
        <div className="bg-teal-50 p-8 min-h-screen flex justify-center items-center">
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
                            className="w-full"
                        />
                        <div className="text-center mt-2 shadow-xl drop-shadow-xl rounded-xl bg-white w-fit p-2">{followers} Followers</div>
                    </div>

                    <div className="mb-6 flex flex-col justify-center items-center">
                        <label className="block text-lg mb-2">How many products do you list monthly?</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={products}
                            onChange={(e) => setProducts(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center mt-2 shadow-xl drop-shadow-xl rounded-xl bg-white w-fit p-2">{products} Products</div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg w-full lg:w-fit"
                    >
                        Calculate
                    </button>
                </div>

                <div className="w-full lg:w-1/3 p-8 rounded-lg flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center mb-6">
                        <h3 className="text-xl font-semibold">Monthly Earning</h3>
                        <p className="text-3xl font-bold text-teal-500">₹{monthlyEarning}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">Yearly Earning</h3>
                        <p className="text-3xl font-bold text-teal-500">₹{yearlyEarning}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimateEarnings;
