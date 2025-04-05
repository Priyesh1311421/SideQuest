import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const StoryPage = ({ storyData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    if (currentIndex < storyData.pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Story Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-zinc-800">{storyData.title}</h1>
            <p className="text-lg text-zinc-600 mb-2">{storyData.subtitle}</p>
            <div className="flex justify-center items-center space-x-2">
              <img 
                src={storyData.countryFlag} 
                alt={`${storyData.country} flag`} 
                className="w-6 h-4 object-cover"
              />
              <span className="text-zinc-700">{storyData.country}</span>
            </div>
          </div>
          
          {/* Story Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {storyData.pages[currentIndex].image && (
              <div className="w-full h-64 md:h-80 overflow-hidden">
                <img 
                  src={storyData.pages[currentIndex].image} 
                  alt={storyData.pages[currentIndex].imageAlt || "Story illustration"} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-800">
                {storyData.pages[currentIndex].title}
              </h2>
              <div className="prose prose-zinc max-w-none">
                {storyData.pages[currentIndex].content.map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-zinc-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentIndex === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            
            <div className="text-zinc-600">
              Page {currentIndex + 1} of {storyData.pages.length}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === storyData.pages.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentIndex === storyData.pages.length - 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          {/* Cultural Facts */}
          {storyData.culturalFacts && (
            <div className="mt-10 bg-stone-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-zinc-800">
                Cultural Facts: {storyData.country}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {storyData.culturalFacts.map((fact, idx) => (
                  <li key={idx} className="text-zinc-700">{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StoryPage;