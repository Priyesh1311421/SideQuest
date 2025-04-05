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

const TextChatPage = () => {
  const [rooms, setRooms] = useState([]);
  const [language, setLanguage] = useState("english");
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
      try {
        const response = await axios.get("http://localhost:5000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [token]);

  const handleJoinRoom = (roomId, roomName) => {
    navigate(`/chat-room/${roomId}`, { 
      state: { roomName, roomId } 
    });
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 flex-col gap-5">
          <h1 className="text-3xl font-bold">Join a Chat Room</h1>

          <div className="flex flex-row gap-5 items-center ">
            <h1 className="font-bold">Select a language:</h1>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border rounded px-3 py-1 text-gray-700"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="japanese">Japanese</option>
              <option value="italian">Italian</option>
              <option value="italian">Portuguese</option>
            </select>
          </div>
        </div>

        <div className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {rooms.map((room) => (
                <CarouselItem key={room._id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={`/chat/${roomImages[room._id] || 'default.jpg'}`} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <h3 className="text-xl font-bold text-white p-4">{room.name}</h3>
                      </div>
                    </div>
                    <CardContent className="flex-grow p-4">
                      <p className="text-gray-700">{room.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4 px-4">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        onClick={() => handleJoinRoom(room._id, room.name)}
                      >
                        Join Room
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 lg:-left-12" />
            <CarouselNext className="right-0 lg:-right-12" />
          </Carousel>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Recent Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.slice(0, 6).map((room) => (
              <Card key={room._id} className="overflow-hidden shadow hover:shadow-md transition-shadow">
                <div className="flex h-24">
                  <div className="w-1/3">
                    <img 
                      src={`/chat/${roomImages[room._id] || 'default.jpg'}`} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-3 flex flex-col justify-between">
                    <h3 className="font-medium text-lg">{room.name}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleJoinRoom(room._id, room.name)}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextChatPage;
