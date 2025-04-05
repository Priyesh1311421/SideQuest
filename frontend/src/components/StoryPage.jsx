import React, { useEffect, useState } from "react";
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
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import TouristCarousel from "./TouristCarousel";

const StoryPage = ({ storyData }) => {
    const [expandedFoods, setExpandedFoods] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("");

    // Toggle individual food item expansion
    const toggleFoodExpand = (index) => {
        setExpandedFoods((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        if (storyData?.languages?.length) {
            setSelectedLanguage(storyData.languages[0].name.toLowerCase());
        }
    }, [storyData?.languages]);

    if (!storyData) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
                    <div className="animate-pulse text-xl font-medium">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Keep the header image and overlay as is */}
            <div className="w-full h-auto overflow-hidden shadow-lg relative">
                <img
                    src={storyData.headerImage}
                    alt={`${storyData.country} landscape`}
                    className="w-full h-full object-cover"
                />

                {/* Overlay with centered text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-center justify-center">
                    <h1 className="text-xl md:text-[130px] font-bold opacity-40 text-white text-center">
                        {storyData.country}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Section Navigation */}
                <div className="mb-12 hidden md:flex justify-center gap-6 flex-wrap">
                    <a href="#greeting" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Greeting</a>
                    <a href="#clothing" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Traditional Clothing</a>
                    <a href="#languages" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Languages</a>
                    <a href="#cuisine" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Cuisine</a>
                    <a href="#festivals" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Festivals</a>
                    <a href="#art" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Art & Culture</a>
                    <a href="#music" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Music</a>
                    <a href="#attractions" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors">Attractions</a>
                </div>

                {/* Greeting Section */}
                <section id="greeting" className="mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 md:p-8 rounded-xl shadow-sm">
                        <div className="flex-1">
                            <p className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
                                {storyData.greeting.text}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {storyData.greeting.description}
                            </p>
                        </div>
                        <div className="w-full md:w-1/3">
                            {storyData.greeting.audio && (
                                <div className="bg-white rounded-xl shadow-sm p-4">
                                    <p className="text-sm text-gray-500 mb-2">Listen to pronunciation</p>
                                    <audio controls className="w-full">
                                        <source
                                            src={storyData.greeting.audio}
                                            type="audio/mpeg"
                                        />
                                        Your browser does not support the
                                        audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Traditional Clothing Section */}
                <section id="clothing" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Traditional Clothing</h2>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {storyData.clothing.carouselImages.map(
                                (image, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="p-1">
                                            <div className="overflow-hidden shadow-md rounded-xl bg-white">
                                                <div className="aspect-square w-full overflow-hidden">
                                                    <img
                                                        src={image}
                                                        alt={`Traditional clothing ${index + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                        <CarouselPrevious className="bg-white shadow-md hover:bg-gray-100 transition-colors -left-3" />
                        <CarouselNext className="bg-white shadow-md hover:bg-gray-100 transition-colors -right-3" />
                    </Carousel>
                </section>

                {/* Languages Section */}
                <section id="languages" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Languages</h2>
                    {storyData.languages &&
                    storyData.languages.length > 0 ? (
                        <Tabs
                            value={selectedLanguage}
                            onValueChange={setSelectedLanguage}
                        >
                            <div className="flex justify-center mb-8">
                                <TabsList className="bg-gray-100 p-1 rounded-xl border border-gray-200 w-auto">
                                    {storyData.languages.map((language) => (
                                        <TabsTrigger
                                            key={language.name}
                                            value={language.name.toLowerCase()}
                                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 font-medium"
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
                                            <h3 className="text-2xl font-bold mb-6 text-gray-700">
                                                Common Phrases
                                            </h3>
                                            <ul className="space-y-4">
                                                {language.phrases.map(
                                                    (phrase, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="border rounded-xl p-5 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                                                        >
                                                            <p className="text-lg font-medium mb-3 text-gray-800">
                                                                {phrase.text}
                                                            </p>
                                                            {phrase.audio && (
                                                                <audio
                                                                    controls
                                                                    className="w-full rounded-lg"
                                                                >
                                                                    <source
                                                                        src={phrase.audio}
                                                                        type="audio/mpeg"
                                                                    />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            )}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            {language.calligraphyImage && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-6 text-gray-700">
                                                        Calligraphy
                                                    </h3>
                                                    <div className="rounded-xl overflow-hidden shadow-md aspect-square">
                                                        <img
                                                            src={language.calligraphyImage}
                                                            alt={`${language.name} calligraphy`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <p className="text-gray-600 italic">No language information available.</p>
                    )}
                </section>

                {/* Food Section */}
                <section id="cuisine" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Cuisine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {storyData.food &&
                            storyData.food.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => toggleFoodExpand(index)}
                                                className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                                                aria-label={
                                                    expandedFoods[index]
                                                        ? "Hide details"
                                                        : "Show details"
                                                }
                                            >
                                                {expandedFoods[index] ? (
                                                    <ChevronUp size={18} />
                                                ) : (
                                                    <ChevronDown size={18} />
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>

                                        {expandedFoods[index] && (
                                            <div className="mt-4 space-y-4 text-gray-700 animate-fadeIn">
                                                <p className="leading-relaxed">{item.description}</p>
                                                {item.videoLink && (
                                                    <a
                                                        href={item.videoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors"
                                                    >
                                                        <ExternalLink
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                        Watch preparation video
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Festivals Section */}
                <section id="festivals" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Festivals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {storyData.festivals &&
                            storyData.festivals.map((festival, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    <div className="aspect-video w-full relative">
                                        <img
                                            src={festival.image}
                                            alt={festival.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                            <h3 className="text-2xl font-bold p-5 text-white">
                                                {festival.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <p className="text-gray-700 mb-5 leading-relaxed flex-1">
                                            {festival.description}
                                        </p>
                                        {festival.videoLink && (
                                            <a
                                                href={festival.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors font-medium mt-auto"
                                            >
                                                <ExternalLink
                                                    size={18}
                                                    className="mr-2"
                                                />
                                                Watch festival highlights
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Art and Culture Section */}
                <section id="art" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Art & Culture</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {storyData.art &&
                            storyData.art.map((artForm, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="md:w-1/3 aspect-square md:aspect-auto">
                                        <img
                                            src={artForm.image}
                                            alt={artForm.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                            {artForm.name}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {artForm.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Music Section */}
                <section id="music" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Traditional Music</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {storyData.music &&
                            storyData.music.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                                        {item.title}
                                    </h3>
                                    <a
                                        href={item.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition-colors"
                                    >
                                        <ExternalLink
                                            size={18}
                                            className="mr-2"
                                        />
                                        Watch performance
                                    </a>
                                </div>
                            ))}
                    </div>
                </section>

                {/* Tourist Attractions Section */}
                <section id="attractions" className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 border-b pb-2">Tourist Attractions</h2>
                    <TouristCarousel
                        touristAttractions={storyData.touristAttractions}
                    />
                </section>
            </div>
        </Layout>
    );
};

export default StoryPage;