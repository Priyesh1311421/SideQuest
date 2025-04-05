import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, ChevronDown, ChevronUp, Layout } from "lucide-react";

const StoryPage = ({ storyData }) => {
    const [expandedFood, setExpandedFood] = useState(null);

    const toggleFoodExpand = (index) => {
        if (expandedFood === index) {
            setExpandedFood(null);
        } else {
            setExpandedFood(index);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Layout />
            {/* Header Section */}
            <div className="relative mb-12">
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={storyData.headerImage}
                        alt={`${storyData.country} landscape`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        {storyData.country}
                    </h1>
                </div>
            </div>

            {/* Rest of the component remains the same... */}

            {/* Greeting Section */}
            <Card className="mb-12">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4">
                                Greeting
                            </h2>
                            <p className="text-6xl font-bold mb-2">
                                {storyData.greeting.text}
                            </p>
                            <p className="text-gray-600">
                                {storyData.greeting.description}
                            </p>
                            {storyData.greeting.audio && (
                                <div className="mt-4">
                                    <audio controls className="w-full">
                                        <source
                                            src={storyData.greeting.audio}
                                            type="audio/mpeg"
                                        />
                                        Your browser does not support the audio
                                        element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Traditional Clothing Section */}
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">
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
                                            <Card>
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
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </CardContent>
            </Card>

            {/* Languages Section */}
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">Languages</h2>
                    <Tabs
                        defaultValue={storyData.languages[0].name.toLowerCase()}
                    >
                        <TabsList className="mb-6">
                            {storyData.languages.map((language) => (
                                <TabsTrigger
                                    key={language.name}
                                    value={language.name.toLowerCase()}
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
                                        <h3 className="text-xl font-bold mb-4">
                                            Common Phrases
                                        </h3>
                                        <ul className="space-y-4">
                                            {language.phrases.map(
                                                (phrase, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="border rounded-lg p-4 bg-gray-50"
                                                    >
                                                        <p className="text-lg font-medium mb-2">
                                                            {phrase.text}
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
                                                                Your browser
                                                                does not support
                                                                the audio
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
                                                <h3 className="text-xl font-bold mb-4">
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
                </CardContent>
            </Card>

            {/* Food Section */}
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">Cuisine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {storyData.food.map((item, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="aspect-video">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-bold">
                                            {item.name}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                toggleFoodExpand(index)
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {expandedFood === index ? (
                                                <ChevronUp size={20} />
                                            ) : (
                                                <ChevronDown size={20} />
                                            )}
                                        </button>
                                    </div>

                                    {expandedFood === index && (
                                        <div className="mt-4 space-y-4">
                                            <p>{item.description}</p>
                                            {item.videoLink && (
                                                <a
                                                    href={item.videoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <ExternalLink
                                                        size={16}
                                                        className="mr-1"
                                                    />{" "}
                                                    Watch preparation video
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
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">Festivals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {storyData.festivals.map((festival, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="aspect-video">
                                    <img
                                        src={festival.image}
                                        alt={festival.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-bold mb-2">
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
                                            className="flex items-center text-blue-600 hover:text-blue-800"
                                        >
                                            <ExternalLink
                                                size={16}
                                                className="mr-1"
                                            />{" "}
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
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">Art & Culture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {storyData.art.map((artForm, index) => (
                            <Card
                                key={index}
                                className="flex flex-col md:flex-row overflow-hidden"
                            >
                                <div className="md:w-1/3">
                                    <img
                                        src={artForm.image}
                                        alt={artForm.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-4 md:w-2/3">
                                    <h3 className="text-xl font-bold mb-2">
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
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">
                        Traditional Music
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {storyData.music.map((item, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="text-xl font-bold mb-2">
                                    {item.title}
                                </h3>
                                <a
                                    href={item.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <ExternalLink size={16} className="mr-1" />{" "}
                                    Watch performance
                                </a>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tourist Attractions Section */}
            <Card className="mb-12">
                <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">
                        Must-visit Places
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {storyData.touristAttractions.map((place, index) => (
                            <Card key={index} className="p-4">
                                <h3 className="text-xl font-bold mb-2">
                                    {place.name}
                                </h3>
                                <a
                                    href={place.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <ExternalLink size={16} className="mr-1" />{" "}
                                    Virtual tour
                                </a>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StoryPage;
