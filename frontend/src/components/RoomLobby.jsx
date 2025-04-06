import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../provider/Socket";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoomLobby() {
    const { socket } = useSocket();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const roomImages = {
        "67f0ff2ecc38e41fecf88c9e": "india.png",
        "67f0ff2ecc38e41fecf88c9f": "japan.png",
        "67f0ff2ecc38e41fecf88ca0": "food.jpg",
        "67f0ff2ecc38e41fecf88ca1": "music.jpg",
        "67f0ff2ecc38e41fecf88ca2": "festivals.jpg",
    };

    const handleRoomJoined = useCallback(
        ({ roomId }) => {
            navigate(`/room/${roomId}`);
        },
        [navigate]
    );

    const fetchRooms = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://3.109.158.27:5000/api/rooms",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRooms(response.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            if (err.response && err.response.status === 401) {
                setError("Authentication failed. Please log in again.");
            } else {
                setError("Failed to load rooms. Please try again.");
            }
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        socket.on("joined-room", handleRoomJoined);

        fetchRooms();
        const intervalId = setInterval(fetchRooms, 30000); // refresh every 30s

        return () => {
            socket.off("joined-room", handleRoomJoined);
            clearInterval(intervalId);
        };
    }, [socket, handleRoomJoined, fetchRooms]);

    const handleJoinRoom = (roomId) => {
        socket.emit("join-room", { roomId });
    };

    const nextSlide = () => {
        if (rooms.length > 0) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % rooms.length);
        }
    };

    const prevSlide = () => {
        if (rooms.length > 0) {
            setActiveIndex(
                (prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length
            );
        }
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-12">
                    Video Chat Rooms
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
                        <p className="text-red-400 mb-4">{error}</p>
                        {error ===
                            "Failed to load rooms. Please try again." && (
                            <button
                                onClick={fetchRooms}
                                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                ) : rooms.length > 0 ? (
                    <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Available Rooms
                        </h2>

                        {/* Main Carousel */}
                        <div className="relative">
                            {/* Carousel Container */}
                            <div className="relative overflow-hidden rounded-lg h-80 mb-6">
                                {/* Carousel Track */}
                                <div
                                    className="flex transition-transform duration-300 ease-in-out h-full"
                                    style={{
                                        transform: `translateX(-${
                                            activeIndex * 100
                                        }%)`,
                                    }}
                                >
                                    {rooms.map((room, index) => (
                                        <div
                                            key={room._id}
                                            className="min-w-full h-full flex-shrink-0"
                                        >
                                            <div className="relative h-full flex flex-col md:flex-row bg-gray-700 rounded-lg overflow-hidden shadow-xl">
                                                {/* Image Section */}
                                                <div className="w-full md:w-1/2 h-40 md:h-full relative">
                                                    <img
                                                        src={`/chat/${
                                                            roomImages[
                                                                room._id
                                                            ] || "default.jpg"
                                                        }`}
                                                        alt={room.name}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                                    <div className="absolute bottom-0 left-0 p-4">
                                                        <h3 className="text-2xl font-bold">
                                                            {room.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-lg mb-4">
                                                            {room.description}
                                                        </p>
                                                        <p className="text-sm text-gray-400">
                                                            Created:{" "}
                                                            {new Date(
                                                                room.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleJoinRoom(
                                                                room._id
                                                            )
                                                        }
                                                        className="mt-4 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
                                                    >
                                                        Join Room
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none z-10"
                                    aria-label="Previous slide"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none z-10"
                                    aria-label="Next slide"
                                >
                                    →
                                </button>
                            </div>

                            {/* Dots Navigation */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {rooms.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full focus:outline-none ${
                                            index === activeIndex
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-6 grid grid-cols-5 gap-2">
                            {rooms.map((room, index) => (
                                <div
                                    key={room._id}
                                    onClick={() => goToSlide(index)}
                                    className={`cursor-pointer rounded-md overflow-hidden ${
                                        index === activeIndex
                                            ? "ring-2 ring-blue-500"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={`/chat/${
                                            roomImages[room._id] ||
                                            "default.jpg"
                                        }`}
                                        alt={room.name}
                                        className="w-full h-20 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
                        <p className="text-gray-400 mb-4">No rooms available</p>
                        <p className="text-sm text-gray-500">
                            Please check back later
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoomLobby;
