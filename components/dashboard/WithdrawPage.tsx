'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WithdrawHistoryProps {
  availableBalance?: number;
  lastWithdraw?: {
    amount: number;
    date: string;
  };
  nextWithdrawDate?: string;
  paymentCycle?: string;
}

const data = [
  { name: 'Week 1', amount: 1800 },
  { name: 'Week 2', amount: 2800 },
  { name: 'Week 3', amount: 3600 },
  { name: 'Week 4', amount: 4100 },
];

const WithdrawHistory: React.FC<WithdrawHistoryProps> = ({
  availableBalance = 10000,
  lastWithdraw = { amount: 50000, date: '21 JUN 2024' },
  nextWithdrawDate = '1 Jul 2024',
  paymentCycle = '1 Jul 2024',
}) => {
  return (
    <div className="bg-white p-6 rounded-lg md:w-[50%] w-full md:border-2 border-black mt-8">
      <div className="mb-6">
        <div className="flex flex-wrap space-x-0 space-y-2 md:space-y-0 md:space-x-4 mb-4">
          <button className="bg-teal-700 text-white px-4 py-2 rounded-full w-full md:w-auto">Daily</button>
          <button className="text-gray-600 px-4 py-2 rounded-full w-full md:w-auto">Monthly</button>
          <button className="text-gray-600 px-4 py-2 rounded-full w-full md:w-auto">Till Date</button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#065f46" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Withdraw History</h2>
        <hr className="text-gray-500 my-4" />
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
              <span className="text-gray-600">Available Balance</span>
              <span className="font-semibold">₹{availableBalance}</span>
            </div>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mt-4 md:mt-0">Withdraw</button>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <span className="text-gray-600">Last withdraw</span>
            <span className="font-semibold">₹{lastWithdraw.amount} on {lastWithdraw.date}</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <span className="text-gray-600 font-semibold">Next date you can withdraw</span>
            <span className="font-semibold">{nextWithdrawDate}</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <span className="text-gray-600 font-semibold">Payment Cycle</span>
            <span className="font-semibold">{paymentCycle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawHistory;
