import React from "react";
import Layout from "../components/Layout";
import { TypewriterEffectSmooth } from "../components/Typewritter-effect";
import FeatureCards from "../components/FeatureCards";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordian";

import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

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

  const faqs = [
    {
      question: "Is this platform free to use?",
      answer:
        "Yes! All our cultural stories and chat features are completely free to explore and enjoy.",
    },
    {
      question: "Do I need to know a foreign language to chat?",
      answer:
        "Not at all. Our voice and text chats include live translation, so you can communicate naturally across languages.",
    },
    {
      question: "How do the cultural stories work?",
      answer:
        "Each story takes you through a country's culture using visuals, sound, and animation — almost like a living slideshow or short immersive film.",
    },
    {
      question: "Can I use this on my phone?",
      answer:
        "Absolutely! The platform is responsive and works well on most modern smartphones and tablets.",
    },
    {
      question: "Which countries are supported in chat?",
      answer:
        "Right now, our text chat has rooms for 2–3 featured countries and global events. More will be added as the community grows!",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Hero Section with Background Pattern and Visual Elements */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden"
             style={{
               background: "linear-gradient(135deg, #f5f7ff 0%, #e9ecff 100%)"
             }}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
            
            {/* World Map Outline in Background */}
            <div className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
                 style={{backgroundImage: "url('https://cdn.jsdelivr.net/npm/world-map-image@1.0.0/outline.svg')"}}></div>
            
            {/* Abstract Connection Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="10" y1="20" x2="90" y2="80" stroke="#6366f1" strokeWidth="0.2" />
              <line x1="20" y1="10" x2="80" y2="90" stroke="#6366f1" strokeWidth="0.2" />
              <line x1="30" y1="30" x2="70" y2="70" stroke="#6366f1" strokeWidth="0.2" />
              <line x1="40" y1="20" x2="60" y2="80" stroke="#6366f1" strokeWidth="0.2" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#6366f1" strokeWidth="0.2" />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Connect Across Cultures
              </div>
            </div>
            
            <div className="mb-12">
              <TypewriterEffectSmooth words={words} />
            </div>
            
            <p className="max-w-lg mx-auto text-gray-600 mb-10 text-lg">
              Immerse yourself in authentic cultural experiences and connect with people around the world through our interactive platform.
            </p>
            
            {/* Get Started Button with enhanced design */}
            {!isAuthenticated ? (
              <button 
                onClick={openLoginModal}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg shadow-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                Get Started
              </button>
            ) : (
              <a 
                href="/text-chat"
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg shadow-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                Start Chatting
              </a>

              
            )}
            </div>
            
          
          {/* Subtle Down Arrow with enhanced animation */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Feature Cards Section with Enhanced Styling and Background */}
        <div className="py-24 w-full relative overflow-hidden" 
             style={{background: "linear-gradient(180deg, #f7f9ff 0%, #ffffff 100%)"}}>
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 to-transparent"></div>
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-indigo-500"
                  style={{
                    width: `${Math.random() * 10 + 5}px`, 
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Unique Features
              </div>
              <h2 className="text-4xl font-bold">Why Choose SideQuest</h2>
              <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded"></div>
            </div>
            <FeatureCards />
          </div>
        </div>

        {/* About Section with Improved Layout and Visual Elements */}
        <div id="about" className="py-24 w-full relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-indigo-50 opacity-50 rounded-l-full"></div>
            <div className="absolute left-10 bottom-10 w-48 h-48 rounded-full border-8 border-indigo-100 opacity-30"></div>
            <div className="absolute right-1/4 top-1/4 w-64 h-64 rounded-full border-16 border-indigo-100 opacity-20"></div>
          </div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center md:space-x-10">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                  Our Mission
                </div>
                <h2 className="text-4xl font-bold mb-6">About Us</h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p className="leading-relaxed">
                    In a world that's more connected than ever, cultural understanding is still rare. Our platform brings people together to share real conversations, real traditions, and real human moments — no matter where you're from or what language you speak.
                  </p>
                  <p className="leading-relaxed">
                    Whether you're a traveler at heart, a language learner, or just curious about the world — this is your space to connect.
                  </p>
                  <div className="pt-8">
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
                        Try Video Chat
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* FAQ Section with Enhanced Styling */}
        <div id="faq" className="py-6 w-full relative overflow-hidden"
             style={{background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)"}}>
          {/* Background patterns */}
          <div className="absolute inset-0">
            <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5"></path>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"></rect>
            </svg>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Got Questions?
              </div>
              <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
              <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded"></div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-1">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left py-5 px-6 hover:bg-gray-50 rounded-lg transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pt-2 pb-5 px-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            

          </div>
        </div>
        
        {/* Call to Action Section - New Addition */}
        <div className="w-full py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore new cultures?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join our community today and start connecting with people from around the world.
            </p>
            {!isAuthenticated ? (
              <button 
                onClick={openLoginModal}
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Get Started — It's Free
              </button>
            ) : (
              <a 
                href="/text-chat"
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Start Chatting
              </a>
            )}
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

export default LandingPage;