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
                <div className="container mx-auto px-4 py-8">Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
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

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header Section */}

                {/* Greeting Section */}
                {/* Greeting Section */}
                <Card className="mb-12 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-row md:flex-row items-center gap-6">
                            <div className="flex-1">
                                <p className="text-4xl md:text-6xl font-bold mb-4">
                                    {storyData.greeting.text}
                                </p>
                                <p className="text-gray-600 text-lg">
                                    {storyData.greeting.description}
                                </p>
                            </div>
                            <div>
                                {storyData.greeting.audio && (
                                    <div className="mt-6">
                                        <audio controls className="">
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
                    </CardContent>
                </Card>

                {/* Traditional Clothing Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Traditional Clothing
                        </h2>
                        <Carousel className="w-full">
                            <CarouselContent>
                                {storyData.clothing.carouselImages.map(
                                    (image, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="md:basis-1/2 lg:basis-1/3"
                                        >
                                            <div className="p-1">
                                                <Card className="overflow-hidden">
                                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                                        <img
                                                            src={image}
                                                            alt={`Traditional clothing ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="bg-white shadow-md" />
                            <CarouselNext className="bg-white shadow-md" />
                        </Carousel>
                    </CardContent>
                </Card>

                {/* Languages Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Languages
                        </h2>
                        {storyData.languages &&
                        storyData.languages.length > 0 ? (
                            <Tabs
                                value={selectedLanguage}
                                onValueChange={setSelectedLanguage}
                            >
                                <TabsList className="mb-6 bg-gray-100">
                                    {storyData.languages.map((language) => (
                                        <TabsTrigger
                                            key={language.name}
                                            value={language.name.toLowerCase()}
                                            className="data-[state=active]:bg-white"
                                        >
                                            {language.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {storyData.languages.map((language) => (
                                    <TabsContent
                                        key={language.name}
                                        value={language.name.toLowerCase()}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-xl font-bold mb-4 text-gray-700">
                                                    Common Phrases
                                                </h3>
                                                <ul className="space-y-4">
                                                    {language.phrases.map(
                                                        (phrase, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                                            >
                                                                <p className="text-lg font-medium mb-2">
                                                                    {
                                                                        phrase.text
                                                                    }
                                                                </p>
                                                                {phrase.audio && (
                                                                    <audio
                                                                        controls
                                                                        className="w-full"
                                                                    >
                                                                        <source
                                                                            src={
                                                                                phrase.audio
                                                                            }
                                                                            type="audio/mpeg"
                                                                        />
                                                                        Your
                                                                        browser
                                                                        does not
                                                                        support
                                                                        the
                                                                        audio
                                                                        element.
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
                                                        <h3 className="text-xl font-bold mb-4 text-gray-700">
                                                            Calligraphy
                                                        </h3>
                                                        <img
                                                            src={
                                                                language.calligraphyImage
                                                            }
                                                            alt={`${language.name} calligraphy`}
                                                            className="w-full rounded-lg shadow-md"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            <p>No language information available.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Food Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Cuisine
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {storyData.food &&
                                storyData.food.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="aspect-video">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        toggleFoodExpand(index)
                                                    }
                                                    className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
                                                    aria-label={
                                                        expandedFoods[index]
                                                            ? "Collapse details"
                                                            : "Expand details"
                                                    }
                                                >
                                                    {expandedFoods[index] ? (
                                                        <ChevronUp size={20} />
                                                    ) : (
                                                        <ChevronDown
                                                            size={20}
                                                        />
                                                    )}
                                                </button>
                                            </div>

                                            {expandedFoods[index] && (
                                                <div className="mt-4 space-y-4 text-gray-700">
                                                    <p>{item.description}</p>
                                                    {item.videoLink && (
                                                        <a
                                                            href={
                                                                item.videoLink
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                                        >
                                                            <ExternalLink
                                                                size={16}
                                                                className="mr-2"
                                                            />
                                                            Watch preparation
                                                            video
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Festivals Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Festivals
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {storyData.festivals &&
                                storyData.festivals.map((festival, index) => (
                                    <Card
                                        key={index}
                                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="aspect-video">
                                            <img
                                                src={festival.image}
                                                alt={festival.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                                {festival.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {festival.description}
                                            </p>
                                            {festival.videoLink && (
                                                <a
                                                    href={festival.videoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    <ExternalLink
                                                        size={16}
                                                        className="mr-2"
                                                    />
                                                    Watch festival highlights
                                                </a>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Art and Culture Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Art & Culture
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {storyData.art &&
                                storyData.art.map((artForm, index) => (
                                    <Card
                                        key={index}
                                        className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="md:w-1/3">
                                            <img
                                                src={artForm.image}
                                                alt={artForm.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4 md:w-2/3">
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                                {artForm.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {artForm.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Music Section */}
                <Card className="mb-12 shadow-md">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">
                            Traditional Music
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {storyData.music &&
                                storyData.music.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="p-4 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <h3 className="text-xl font-bold mb-2 text-gray-800">
                                            {item.title}
                                        </h3>
                                        <a
                                            href={item.videoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            <ExternalLink
                                                size={16}
                                                className="mr-2"
                                            />
                                            Watch performance
                                        </a>
                                    </Card>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Tourist Attractions Section */}
                        <TouristCarousel
                            touristAttractions={storyData.touristAttractions}
                        />
            </div>
        </Layout>
    );
};

export default StoryPage;
