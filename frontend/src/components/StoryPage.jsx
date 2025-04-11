import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "../components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, ChevronDown, ChevronUp, Globe, Clock, MapPin, Music, Gift, Utensils, PenTool, Camera } from "lucide-react";
import TouristCarousel from "./TouristCarousel";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const StoryPage = ({ storyData }) => {
    const [expandedFoods, setExpandedFoods] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [activeSection, setActiveSection] = useState("greeting");
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Toggle individual food item expansion
    const toggleFoodExpand = (index) => {
        setExpandedFoods((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    
    // Track the active section based on scroll position
    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 } // When 30% of the section is visible
        );
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        return () => {
            sections.forEach(section => {
                sectionObserver.unobserve(section);
            });
        };
    }, [storyData]);

    useEffect(() => {
        if (storyData?.languages?.length) {
            setSelectedLanguage(storyData.languages[0].name.toLowerCase());
        }
        
        // Scroll to top when page loads
        window.scrollTo(0, 0);
    }, [storyData?.languages]);

    if (!storyData) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin w-12 h-12 border-4 border-t-purple-600 border-purple-200 rounded-full"></div>
                        <div className="text-xl font-medium text-gray-700">Loading cultural experience...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Get country-specific accent color
    const getCountryAccentColor = () => {
        const colorMap = {
            japan: "from-rose-600 to-red-600",
            india: "from-orange-500 to-amber-600",
            brazil: "from-green-600 to-emerald-600",
            italy: "from-blue-700 to-indigo-600",
        };
        
        return colorMap[storyData.country.toLowerCase()] || "from-purple-600 to-indigo-600";
    };
    
    const countryAccent = getCountryAccentColor();
    
    // Map of section icons
    const sectionIcons = {
        greeting: <Globe size={18} />,
        clothing: <PenTool size={18} />,
        languages: <Globe size={18} />,
        cuisine: <Utensils size={18} />,
        festivals: <Gift size={18} />,
        art: <PenTool size={18} />,
        music: <Music size={18} />,
        attractions: <MapPin size={18} />
    };

    return (
        <Layout>
            {/* Immersive Hero Header */}
            <motion.div 
                ref={headerRef} 
                className="w-full h-[70vh] overflow-hidden relative"
                style={{ scale }}
            >
                <motion.img
                    src={storyData.headerImage}
                    alt={`${storyData.country} landscape`}
                    className="w-full h-full object-cover"
                    style={{ scale }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Gradient overlay with animated appearance */}
                <motion.div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
                
                {/* Country name with parallax effect */}
                <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    style={{ opacity: textOpacity, scale: textScale }}
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-white/90 uppercase tracking-widest text-sm mb-4 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                            Explore
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white text-center drop-shadow-lg">
                            {storyData.country}
                        </h1>
                        {storyData.subtitle && (
                            <p className="mt-4 text-xl text-white/80">
                                {storyData.subtitle}
                            </p>
                        )}
                    </motion.div>
                </motion.div>
                
                {/* Scroll indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <div className="text-white/70 text-sm mb-2">Scroll to explore</div>
                    <motion.div 
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <motion.div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Floating section navigation bar that becomes sticky on scroll */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200/50 py-2">
                <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-1 md:space-x-2 justify-start md:justify-center">
                        {Object.entries(sectionIcons).map(([sectionId, icon]) => {
                            const isActive = activeSection === sectionId;
                            const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
                            
                            return (
                                <a 
                                    key={sectionId}
                                    href={`#${sectionId}`}
                                    className={`whitespace-nowrap px-3 md:px-4 py-2 md:py-3 rounded-xl flex items-center transition-all duration-300 text-sm md:text-base ${
                                        isActive 
                                            ? `bg-gradient-to-r ${countryAccent} text-white font-medium shadow-md` 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <span className="mr-2">{icon}</span>
                                    {sectionName}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Greeting Section */}
                <motion.section 
                    id="greeting" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div 
                        className={`flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white to-gray-50 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                        </div>
                        
                        <div className="flex-1 relative z-10">
                            <div className="inline-block px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white text-xs uppercase tracking-wider rounded-full mb-6">
                                Local Greeting
                            </div>
                            <p className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                                {storyData.greeting.text}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {storyData.greeting.description}
                            </p>
                        </div>
                        
                        <div className="w-full md:w-1/3 relative z-10">
                            {storyData.greeting.audio && (
                                <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-transform hover:scale-105 duration-300 border border-gray-100">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white mr-3">
                                            <Music size={16} />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">Listen to pronunciation</p>
                                    </div>
                                    <audio 
                                        controls 
                                        className="w-full rounded-lg" 
                                        style={{ 
                                            height: '40px', 
                                            backgroundColor: '#f9fafb' 
                                        }}
                                    >
                                        <source src={storyData.greeting.audio} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.section>

                {/* Traditional Clothing Section */}
                <motion.section 
                    id="clothing" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <PenTool size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Traditional Clothing
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-white rounded-3xl p-6 shadow-xl"
                    >
                        <Carousel className="w-full">
                            <CarouselContent>
                                {storyData.clothing.carouselImages.map((image, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-2">
                                            <motion.div 
                                                className="overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100"
                                                whileHover={{ y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="aspect-square w-full overflow-hidden">
                                                    <img
                                                        src={image}
                                                        alt={`Traditional clothing ${index + 1}`}
                                                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                {storyData.clothing.captions && storyData.clothing.captions[index] && (
                                                    <div className="p-4 text-center bg-gradient-to-r from-gray-50 to-white">
                                                        <p className="text-gray-700 font-medium">{storyData.clothing.captions[index]}</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="bg-white shadow-lg hover:bg-gray-50 transition-colors -left-3 border border-gray-200" />
                            <CarouselNext className="bg-white shadow-lg hover:bg-gray-50 transition-colors -right-3 border border-gray-200" />
                        </Carousel>
                        {storyData.clothing.description && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                                <p className="text-gray-600 italic text-lg">{storyData.clothing.description}</p>
                            </div>
                        )}
                    </motion.div>
                </motion.section>

                {/* Languages Section */}
                <motion.section 
                    id="languages" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <Globe size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Languages
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        className="bg-white rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden"
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {storyData.languages && storyData.languages.length > 0 ? (
                            <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                <div className="flex justify-center mb-8">
                                    <TabsList className="bg-gray-100 p-1.5 rounded-xl border border-gray-200 w-auto">
                                        {storyData.languages.map((language) => (
                                            <TabsTrigger
                                                key={language.name}
                                                value={language.name.toLowerCase()}
                                                className="data-[state=active]:bg-white data-[state=active]:shadow-md px-6 py-2.5 font-medium rounded-lg"
                                            >
                                                {language.name}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                {storyData.languages.map((language) => (
                                    <TabsContent
                                        key={language.name}
                                        value={language.name.toLowerCase()}
                                        className="focus:outline-none"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-200 pb-2">
                                                    Common Phrases
                                                </h3>
                                                <div className="space-y-4">
                                                    {language.phrases.map((phrase, idx) => (
                                                        <motion.div
                                                            key={idx} 
                                                            className="border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 group cursor-pointer"
                                                            whileHover={{ scale: 1.02 }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-xl font-semibold mb-1 text-gray-800 group-hover:text-indigo-700 transition-colors">
                                                                        {phrase.text}
                                                                    </p>
                                                                    {phrase.translation && (
                                                                        <p className="text-gray-500 text-sm">
                                                                            "{phrase.translation}"
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {phrase.audio && (
                                                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                                                        <Music size={18} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {phrase.audio && (
                                                                <div className="mt-3">
                                                                    <audio controls className="w-full rounded-lg audio-minimal">
                                                                        <source src={phrase.audio} type="audio/mpeg" />
                                                                        Your browser does not support audio.
                                                                    </audio>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                {language.calligraphyImage && (
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-200 pb-2">
                                                            Calligraphy
                                                        </h3>
                                                        <motion.div 
                                                            className="rounded-2xl overflow-hidden shadow-lg"
                                                            whileHover={{ scale: 1.02 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            <img
                                                                src={language.calligraphyImage}
                                                                alt={`${language.name} calligraphy`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </motion.div>
                                                        {language.calligraphyDescription && (
                                                            <p className="mt-4 text-gray-600 italic">{language.calligraphyDescription}</p>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {language.funFacts && language.funFacts.length > 0 && (
                                                    <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                                                        <h4 className="font-bold text-xl mb-3 text-indigo-900">Language Fun Facts</h4>
                                                        <ul className="list-disc pl-5 space-y-2">
                                                            {language.funFacts.map((fact, idx) => (
                                                                <li key={idx} className="text-gray-700">{fact}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            <p className="text-gray-600 italic text-center py-8">No language information available.</p>
                        )}
                    </motion.div>
                </motion.section>

                {/* Food Section */}
                <motion.section 
                    id="cuisine" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <Utensils size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Cuisine
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {storyData.food &&
                            storyData.food.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col group"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-indigo-700 transition-colors">
                                                {item.name}
                                            </h3>

                                            <div className="text-gray-600 leading-relaxed mb-6">
                                                {item.description}
                                            </div>
                                        </div>

                                        {item.videoLink && (
                                            <motion.a
                                                href={item.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 p-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-auto"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <ExternalLink size={16} className="mr-2" />
                                                Watch preparation video
                                            </motion.a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </motion.section>

                {/* Festivals Section */}
                <motion.section 
                    id="festivals" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <Gift size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Festivals
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {storyData.festivals && storyData.festivals.map((festival, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="aspect-video w-full relative">
                                    <img
                                        src={festival.image}
                                        alt={festival.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
                                        <div className="p-6">
                                            <div className="flex items-center mb-2">
                                                {festival.date && (
                                                    <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm text-white mb-2">
                                                        <Clock size={14} className="mr-1" />
                                                        {festival.date}
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-3xl font-bold text-white drop-shadow-md">
                                                {festival.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                                        {festival.description}
                                    </p>
                                    {festival.videoLink && (
                                        <motion.a
                                            href={festival.videoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 p-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-auto"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <ExternalLink size={18} className="mr-2" />
                                            Watch festival highlights
                                        </motion.a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Art and Culture Section */}
                <motion.section 
                    id="art" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <PenTool size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Art & Culture
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        className="space-y-8" 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {storyData.art &&
                            storyData.art.map((artForm, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="md:w-1/3 aspect-square md:aspect-auto relative group overflow-hidden">
                                        <img
                                            src={artForm.image}
                                            alt={artForm.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="p-4">
                                                <p className="text-white font-bold">{artForm.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 md:w-2/3 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                            {artForm.name}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {artForm.description}
                                        </p>
                                        {artForm.learnMoreLink && (
                                            <a 
                                                href={artForm.learnMoreLink}
                                                target="_blank"
                                                rel="noopener noreferrer" 
                                                className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                                            >
                                                Learn more about {artForm.name}
                                                <ExternalLink size={16} className="ml-1" />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </motion.section>

                {/* Music Section */}
                <motion.section 
                    id="music" 
                    className="mb-24" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <Music size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Traditional Music
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6" 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {storyData.music &&
                            storyData.music.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                                    whileHover={{ 
                                        y: -5,
                                        backgroundColor: "#f9fafb" 
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-gray-600 mb-4 flex-1">
                                            {item.description}
                                        </p>
                                    )}
                                    <motion.a
                                        href={item.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium p-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink
                                            size={18}
                                            className="mr-2"
                                        />
                                        Watch performance
                                    </motion.a>
                                </motion.div>
                            ))}
                    </motion.div>
                </motion.section>

                {/* Tourist Attractions Section */}
                <motion.section 
                    id="attractions" 
                    className="mb-16" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${countryAccent} flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Tourist Attractions
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-white rounded-3xl p-6 shadow-xl"
                    >
                        <TouristCarousel touristAttractions={storyData.touristAttractions} preload={true} />
                    </motion.div>
                </motion.section>
                
                {/* Final Call to Action */}
                <motion.div 
                    className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-xl relative"
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 md:p-12 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to discover more?</h3>
                        <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
                            Connect with locals, learn the language, and immerse yourself in the rich culture of {storyData.country}.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a 
                                href="/text-chat" 
                                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-xl shadow-lg transition-all hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Chat with Locals
                            </motion.a>
                            <motion.a 
                                href="/" 
                                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Explore More Countries
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .audio-minimal::-webkit-media-controls-enclosure {
                    background-color: transparent;
                }
                
                .audio-minimal::-webkit-media-controls-panel {
                    background-color: #f3f4f6;
                }
                
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite;
                }
                
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </Layout>
    );
};

export default StoryPage;