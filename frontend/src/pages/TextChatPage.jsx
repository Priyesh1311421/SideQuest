import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Globe, Users, Clock } from "lucide-react";

const TextChatPage = () => {
  const [rooms, setRooms] = useState([]);
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Room images mapping (fixed data)
  const roomImages = {
    "67f0ff2ecc38e41fecf88c9e": "india.png",
    "67f0ff2ecc38e41fecf88c9f": "japan.png",
    "67f0ff2ecc38e41fecf88ca0": "food.jpg",
    "67f0ff2ecc38e41fecf88ca1": "music.jpg",
    "67f0ff2ecc38e41fecf88ca2": "festivals.jpg",
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      localStorage.setItem("language", "english");
    }

    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://3.109.158.27:5000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [token]);

  const handleJoinRoom = (roomId, roomName) => {
    navigate(`/chat-room/${roomId}`, { 
      state: { roomName, roomId } 
    });
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  // Display all 5 rooms in the carousel instead of just 3
  const featuredRooms = rooms.slice(0, 5);
  const recentRooms = rooms.slice(0, 6);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero section */}
        <div className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-center flex-col md:flex-row gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Explore Chat Rooms</h1>
              <p className="text-blue-100 text-lg mb-6">Connect with others and practice languages in real-time</p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-flex items-center gap-3">
                <Globe size={20} />
                <span className="font-medium">Your learning language:</span>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-36 bg-white/10 border-0">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-full bg-white/10 p-6">
              <Users size={64} className="text-white" />
            </div>
          </div>
        </div>

        {/* Featured Rooms Carousel - Now showing all 5 rooms */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Rooms</h2>
            <div className="text-blue-600 text-sm font-medium">
              {isLoading ? "" : `${featuredRooms.length} rooms available`}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Carousel className="w-full">
              <div className="flex items-center justify-end gap-2 mb-4">
                <CarouselPrevious className="relative static h-8 w-8" />
                <CarouselNext className="relative static h-8 w-8" />
              </div>
              <CarouselContent>
                {featuredRooms.map((room) => (
                  <CarouselItem key={room._id} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-white to-blue-50">
                      <div className="relative h-48">
                        <img 
                          src={`/chat/${roomImages[room._id] || 'default.jpg'}`} 
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                          <h3 className="text-xl font-bold text-white">{room.name}</h3>
                        </div>
                      </div>
                      <CardContent className="flex-grow p-4">
                        <p className="text-gray-600">{room.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4 px-4">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-6"
                          onClick={() => handleJoinRoom(room._id, room.name)}
                        >
                          Join Conversation
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>

        {/* Recent Rooms Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              <h2 className="text-2xl font-bold">Recent Rooms</h2>
            </div>
            <div className="text-blue-600 text-sm font-medium">
              {isLoading ? "" : `${recentRooms.length} rooms`}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRooms.map((room) => (
                <Card key={room._id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="flex h-28">
                    <div className="w-1/3">
                      <img 
                        src={`/chat/${roomImages[room._id] || 'default.jpg'}`} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <h3 className="font-medium text-lg text-gray-800">{room.name}</h3>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleJoinRoom(room._id, room.name)}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors w-20"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TextChatPage;