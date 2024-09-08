'use client'
import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { GoPlus } from "react-icons/go";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const faqItems: FAQItem[] = [
    { question: "How much does it cost to set up a store?", answer: "" },
    { question: "What kind of digital products can I sell?", answer: "" },
    {
      question: "Do I need technical skills to use the platform?",
      answer: "No, not at all! Our platform is designed with user-friendliness in mind. You can easily navigate and set up your store without any technical expertise. It's as simple as a few clicks to get started!"
    },
    { question: "Is there a limit to the number of products I can list?", answer: "" },
    { question: "How do I receive payments for my sales?", answer: "" },
    { question: "Can I sell internationally on this marketplace?", answer: "" },
    { question: "What support and resources are available for sellers?", answer: "" },
    { question: "Is there a review process for uploaded products?", answer: "" },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Quick answers to questions you may have. Can&apos;t find what you&apos;re looking for?
          <br />
          <a href="#" className="text-blue-600 hover:underline">Check out our full documentation</a>
        </p>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-[#E5F0F1] rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-[#003C3C]">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <GoPlus className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-[#E5F0F1]">
                  <p className="text-[#003C3C]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;