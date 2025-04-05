import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import ChatRoom from "./ChatRoom";

const TextChatPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  // const roomId = "67f0ff2ecc38e41fecf88c9e"; // Pass the room ID to join

  const userId = localStorage.getItem('userId')

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Select a Room</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => {
                setSelectedRoom(room._id);
                setSelectedName(room.name);
              }}
              className={`px-4 py-2 rounded ${
                selectedRoom === room._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
        {selectedRoom ? (
          <ChatRoom name={selectedName} userId={userId} roomId={selectedRoom} />
        ) : (
          <p className="text-gray-500">No room selected</p>
        )}
      </div>
    </Layout>
  );
};

export default TextChatPage;
