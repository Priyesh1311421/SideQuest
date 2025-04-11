import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { TypewriterEffectSmooth } from "../components/Typewritter-effect";
import FeatureCards from "../components/FeatureCards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordian";

import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

// Consistent image base URLs for better asset management
const UNSPLASH_BASE = "https://images.unsplash.com";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Country images with actual high-quality URLs
  const countryImages = {
    Japan: `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=800&q=80`,
    India: `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=800&q=80`,
    Brazil: `${UNSPLASH_BASE}/photo-1516306580123-e6e52b1b7b5f?w=800&q=80`,
    Italy: `${UNSPLASH_BASE}/photo-1516483638261-f4dbaf036963?w=800&q=80`,
    France: `${UNSPLASH_BASE}/photo-1502602898657-3e91760cbb34?w=800&q=80`,
    Mexico: `${UNSPLASH_BASE}/photo-1512813195386-6cf811ad3542?w=800&q=80`,
  };

  // Country data
  const countries = [
    { name: "Japan", flag: "🇯🇵", color: "from-red-600 to-red-400", image: countryImages.Japan },
    { name: "India", flag: "🇮🇳", color: "from-orange-600 to-orange-400", image: countryImages.India },
    { name: "Brazil", flag: "🇧🇷", color: "from-green-600 to-green-400", image: countryImages.Brazil },
    { name: "Italy", flag: "🇮🇹", color: "from-emerald-600 to-emerald-400", image: countryImages.Italy },
    { name: "France", flag: "🇫🇷", color: "from-blue-600 to-blue-400", image: countryImages.France },
    { name: "Mexico", flag: "🇲🇽", color: "from-yellow-600 to-yellow-400", image: countryImages.Mexico },
  ];

  // Cultural phrases with translations
  const culturalPhrases = [
    { language: "Japanese", phrase: "こんにちは", translation: "Hello", romanized: "Konnichiwa" },
    { language: "Hindi", phrase: "नमस्ते", translation: "Hello", romanized: "Namaste" },
    { language: "Portuguese", phrase: "Olá", translation: "Hello", romanized: "Olá" },
    { language: "Italian", phrase: "Ciao", translation: "Hello", romanized: "Ciao" },
    { language: "French", phrase: "Bonjour", translation: "Hello", romanized: "Bonjour" },
    { language: "Spanish", phrase: "Hola", translation: "Hello", romanized: "Hola" },
  ];

  // FAQs data
  const faqs = [
    {
      question: "What makes SideQuest different from language learning apps?",
      answer:
        "Unlike traditional language apps, SideQuest focuses on authentic cultural exchange through real human connections. We provide both guided cultural experiences and live conversations with people from around the world.",
    },
    {
      question: "Do I need to know a foreign language to use SideQuest?",
      answer:
        "Not at all! Our voice and text chats include live translation, so you can communicate naturally across languages while learning at your own pace.",
    },
    {
      question: "How do the cultural stories work?",
      answer:
        "Our immersive cultural stories take you through a country's traditions, food, festivals and daily life using stunning visuals, authentic sounds, and interactive elements — creating a virtual travel experience.",
    },
    {
      question: "Can I connect with people from specific countries?",
      answer:
        "Absolutely! Our chat rooms are organized by country and interest topics, allowing you to connect with people from Japan, India, Brazil, Italy and more.",
    },
    {
      question: "Is SideQuest completely free to use?",
      answer:
        "Yes! All our core features including cultural stories, text chats, and basic voice chats are free to enjoy. Premium features will be available in the future for enhanced experiences.",
    },
  ];

  // Words for typewriter effect
  const words = [
    { text: "Discover ", className: "text-white" },
    { text: "cultures. ", className: "text-white" },
    { text: "Connect ", className: "text-white" },
    { text: "globally. ", className: "text-white" },
    { text: "Experience ", className: "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500" },
    { text: "humanity.", className: "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500" },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Aiko Tanaka",
      country: "Japan",
      quote: "SideQuest helped me share Japanese traditions while improving my English. The cultural exchange feels authentic and meaningful.",
      avatar: `${UNSPLASH_BASE}/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80`,
      rating: 5,
    },
    {
      name: "Marco Rossi",
      country: "Italy",
      quote: "I've made friends from across the globe and learned so much about different cultures. The translation feature makes conversations effortless!",
      avatar: `${UNSPLASH_BASE}/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80`,
      rating: 5,
    },
    {
      name: "Priya Sharma",
      country: "India",
      quote: "The cultural stories about Indian festivals are beautifully crafted. I love how I can connect with others who appreciate our traditions.",
      avatar: `${UNSPLASH_BASE}/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80`,
      rating: 5,
    },
  ];

  // Cultural highlights
  const culturalHighlights = [
    {
      country: "Japan",
      highlights: ["Cherry Blossom Season", "Tea Ceremonies", "Anime & Manga Culture"],
      color: "bg-red-500",
      image: `${UNSPLASH_BASE}/photo-1492571350019-22de08371fd3?w=800&q=80`,
    },
    {
      country: "India",
      highlights: ["Diwali Festival", "Regional Cuisines", "Classical Arts"],
      color: "bg-orange-500",
      image: `${UNSPLASH_BASE}/photo-1532664189809-02133fee698d?w=800&q=80`,
    },
    {
      country: "Brazil",
      highlights: ["Carnival Celebrations", "Amazon Rainforest", "Samba Music"],
      color: "bg-green-500",
      image: `${UNSPLASH_BASE}/photo-1518639192441-8fce0a366e2e?w=800&q=80`,
    },
    {
      country: "Italy",
      highlights: ["Renaissance Art", "Regional Pasta Dishes", "Historical Sites"],
      color: "bg-emerald-500",
      image: `${UNSPLASH_BASE}/photo-1529260830199-42c24126f198?w=800&q=80`,
    },
  ];

  // Authentication effects
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    // Country rotation interval
    const interval = setInterval(() => {
      setActiveCountry((current) => (current + 1) % countries.length);
    }, 3000);

    // Intersection observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearInterval(interval);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Modal control functions
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsAuthenticated(true);
  };
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <Layout>
      {/* Hero Section with Animated Background */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          {/* World map subtle overlay */}
          <div
            className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage:
                "url('https://cdn.jsdelivr.net/npm/world-map-image@1.0.0/outline.svg')",
            }}
          ></div>

          {/* Floating cultural elements */}
          {[
            "🎎", "🎭", "🏮", "🪔", "🎨", "🎊", "📚", "🍵", "🍣", 
            "🍝", "🥘", "🌏", "✈️", "🗺️", "🎵", "📷", "🎞️"
          ].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-20 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 20}s`,
                transform: `rotate(${Math.random() * 30 - 15}deg)`,
              }}
            >
              {emoji}
            </div>
          ))}

          {/* Background gradient circles */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-pink-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "2.2s" }}></div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 z-10 py-24 text-center">
          {/* Badge */}
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8">
            <span className="mr-1">✨</span> Cultural Exchange Reimagined
          </div>

          {/* Main heading with typewriter effect */}
          <div className="max-w-4xl mx-auto mb-12">
            <TypewriterEffectSmooth words={words} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter" />
          </div>

          {/* Featured country with animation */}
          <div
            className={`mb-12 inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r ${countries[activeCountry].color} animate-fadeIn transition-all duration-500`}
          >
            <div className="bg-blue-950/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-4">
              <span className="text-4xl animate-bounce-subtle">
                {countries[activeCountry].flag}
              </span>
              <div className="text-left">
                <span className="text-gray-200 text-sm font-medium">Explore</span>
                <h3 className="text-white text-2xl font-bold">{countries[activeCountry].name}</h3>
              </div>
            </div>
          </div>

          {/* Cultural phrase with card effect */}
          <div className="mb-16 relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-sm opacity-70 transform rotate-1"></div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 relative shadow-xl border border-white/10">
              <p className="text-3xl font-bold mb-2 text-white">
                {culturalPhrases[activeCountry].phrase}
              </p>
              <p className="text-lg text-pink-200 mb-1">
                "{culturalPhrases[activeCountry].romanized}"
              </p>
              <p className="text-sm text-blue-100">
                "{culturalPhrases[activeCountry].translation}" in {culturalPhrases[activeCountry].language}
              </p>
            </div>
          </div>

          {/* Call to action section */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-gray-200 text-xl mb-10">
              Join a community where language barriers dissolve and cultural understanding 
              flourishes through authentic interactions and immersive experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              {!isAuthenticated ? (
                <button
                  onClick={openLoginModal}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium text-lg shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Begin Your Journey
                </button>
              ) : (
                <a
                  href="/text-chat"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium text-lg shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Start Chatting
                </a>
              )}

              <a
                href="#cultures"
                className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-white/5"
              >
                Explore Cultures
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Cultural Destinations Section */}
      <section id="cultures" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4 inline-block">
              Global Destinations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-blue-800 to-emerald-800">
              Immerse Yourself in Culture
            </h2>
            <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Destinations grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturalHighlights.map((country, idx) => (
              <div
                key={idx}
                className="group relative h-96 overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${country.image}')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70"></div>
                
                {/* Country information overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white transition-all duration-300">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                    <h3 className="text-3xl font-bold mb-2">{country.country}</h3>
                    <div className="w-12 h-1 bg-white rounded-full mb-4 transform origin-left transition-all duration-500 group-hover:w-20"></div>
                    
                    {/* Highlights that appear on hover */}
                    <ul className="space-y-1 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {country.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${country.color}`}></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA link that appears on hover */}
                  <div className="mt-6 opacity-0 transform translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <a
                      href={`/stories/${country.country.toLowerCase()}`}
                      className="inline-flex items-center text-sm font-semibold hover:underline"
                    >
                      Explore {country.country}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="0.5"></path>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"></rect>
          </svg>
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-100 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-100 opacity-30 rounded-full blur-3xl"></div>
        </div>

        {/* Section header */}
        <div className="relative z-10 text-center mb-16">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 inline-block">
            Unique Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why Choose SideQuest</h2>
          <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Features component */}
        <div className="relative z-10">
          <FeatureCards />
        </div>
      </section>

      {/* Testimonials Section with Cards */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4 inline-block">
              Community Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What Our Users Say</h2>
            <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative">
                {/* Country flag badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-bl-xl rounded-tr-xl py-1 px-3">
                  <span className="text-white font-medium">{testimonial.country}</span>
                </div>
                
                {/* Giant quote marks */}
                <div className="absolute top-6 left-6 text-8xl text-purple-100 opacity-40 font-serif">"</div>
                
                {/* Testimonial content */}
                <div className="relative">
                  {/* User info */}
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-100 mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                      <div className="text-yellow-400 flex">
                        {"★".repeat(testimonial.rating).split("").map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-600 relative z-10">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent rounded-l-full"></div>
          <div className="absolute left-10 bottom-10 w-48 h-48 rounded-full border-8 border-purple-100 opacity-30"></div>
          <div className="absolute right-1/4 top-1/4 w-64 h-64 rounded-full border-16 border-blue-100 opacity-20"></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12 gap-12 lg:gap-0">
            {/* Image with decorative effects */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-3/4 h-3/4 border-2 border-purple-300 rounded-2xl"></div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={`${UNSPLASH_BASE}/photo-1527525443983-6e60c75fff46?w=800&q=80`}
                    alt="People connecting across cultures"
                    className="w-full h-auto rounded-2xl"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent opacity-60"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-blue-100 rounded-2xl"></div>
              </div>
            </div>

            {/* Text content */}
            <div className="lg:w-1/2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4 inline-block">
                Our Mission
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Bridging Cultures, Building Understanding</h2>
              
              <div className="space-y-5 text-lg text-gray-600">
                <p className="leading-relaxed">
                  In an increasingly connected yet divided world, SideQuest creates spaces where genuine cultural understanding can flourish. We believe that real human connections across different backgrounds are the foundation for a more empathetic global community.
                </p>
                <p className="leading-relaxed">
                  Our platform combines immersive cultural content with live conversation opportunities—breaking down language barriers and geographic distances to let people share their authentic traditions, perspectives, and daily experiences.
                </p>
                <p className="leading-relaxed">
                  Whether you're preparing for international travel, learning a new language, or simply curious about how life unfolds in different corners of the world—SideQuest offers you a window into diverse human experiences.
                </p>
                
                {/* CTA button */}
                <div className="pt-8">
                  {!isAuthenticated ? (
                    <button
                      onClick={openLoginModal}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-medium shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Join Our Community
                    </button>
                  ) : (
                    <a
                      href="/voice-chat"
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-medium shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Try Voice Chat
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4 inline-block">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* FAQ accordion */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-xl font-medium text-left py-6 px-8 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-lg pt-2 pb-6 px-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-white opacity-10"></div>
          
          {/* Floating emojis */}
          {["🌎", "🌍", "🌏", "✈️", "🗺️", "🎭", "🎌", "🧳", "🎊"].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-10 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 20}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Content container */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Ready to embark on your cultural journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
            Join thousands of cultural explorers and make connections that transcend borders and language barriers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {!isAuthenticated ? (
              <button
                onClick={openLoginModal}
                className="px-10 py-5 bg-white text-indigo-600 hover:text-indigo-800 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300"
              >
                Start Exploring — Free
              </button>
            ) : (
              <a
                href="/text-chat"
                className="px-10 py-5 bg-white text-indigo-600 hover:text-indigo-800 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300"
              >
                Start Chatting Now
              </a>
            )}

            <a
              href="#about"
              className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Featured countries tags */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {countries.map((country) => (
              <span
                key={country.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm border border-white/20"
              >
                <span>{country.flag}</span>
                {country.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Login and signup modals */}
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