"use client";

import { useState } from "react";
import Container from "../Container";

const faqItems = [
  {
    question: "How do I join LACTISA",
    answer: "Thank you for your consideration. To become a member, please navigate to the Register button located at the top left corner of our website. Complete the registration form and submit your details. A representative from our team will review your application and reach out to assist with account activation."
  },
  {
    question: "How do I download busary forms?",
    answer: "To download our busary forms, navigate to the Resources tab of our website and search for the particular form you need."
  },
  {
    question: "How do I recover my password?",
    answer: "To reset your password, please contact one of our representatives for assistance."
  },
  {
    question: "How can I get the Internship opportunities?",
    answer: "To access our internship opportunities, navigate to the programs section of our website to apply. For further clarification, please contact one or our representatives."
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
        <div className="w-full mx-auto p-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 mb-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
            {faqItems.map((faq, index) => (
            <div key={index} className="border border-secondary rounded-lg p-4 shadow-md">
                <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center"
                >
                {faq.question}
                <span className="text-primary">{activeIndex === index ? "−" : "+"}</span>
                </button>
                {activeIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </div>
            ))}
        </div>
        </div>
    </Container>
  );
};

export default Faq;