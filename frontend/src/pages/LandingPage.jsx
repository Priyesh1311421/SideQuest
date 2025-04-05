import React from "react";
import Layout from "../components/Layout";
import { TypewriterEffectSmooth } from "../components/Typewritter-effect";
import FeatureCards from "../components/FeatureCards";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const words = [
    { text: "Where " },
    { text: "cultures " },
    { text: "meet, " },
    { text: "stories " },
    { text: "begin." },
  ];

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsAuthenticated(true);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Hero Section with Improved Visual Hierarchy */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="mb-12">
            <TypewriterEffectSmooth words={words} />
          </div>
          
          {/* Get Started Button - Shows Login if not authenticated */}
          {!isAuthenticated ? (
            <button 
              onClick={openLoginModal}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          ) : (
            <a 
              href="/text-chat"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Chatting
            </a>
          )}
          
          {/* Subtle Down Arrow */}
          <div className="mt-16 animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Feature Cards Section with Enhanced Styling */}
        <div className="py-24 w-full bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose SideQuest</h2>
          <FeatureCards />
        </div>

        {/* About Section with Improved Layout */}
        <div id="about" className="py-24 bg-white w-full">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p className="leading-relaxed">
                In a world that's more connected than ever, cultural understanding is still rare. Our platform brings people together to share real conversations, real traditions, and real human moments — no matter where you're from or what language you speak.
              </p>
              <p className="leading-relaxed">
                Whether you're a traveler at heart, a language learner, or just curious about the world — this is your space to connect.
              </p>
              <div className="pt-8 flex justify-center">
                {!isAuthenticated ? (
                  <button 
                    onClick={openLoginModal}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    Join Our Community
                  </button>
                ) : (
                  <a 
                    href="/voice-chat"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    Try Voice Chat
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import and use the same modals from Header component */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          openSignupModal={openSignupModal}
        />
      )}
      
      {isSignupModalOpen && (
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          openLoginModal={openLoginModal}
        />
      )}
    </Layout>
  );
};

// Make sure to include these imports at the top of your file
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default LandingPage;