import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../provider/Socket";
import { useNavigate } from "react-router-dom";

function RoomLobby() {
    const { socket } = useSocket();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [roomId, setRoomId] = useState();

    const handleRoomJoined = useCallback(
        ({ roomId }) => {
            navigate(`/room/${roomId}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("joined-room", handleRoomJoined);
        return () => {
            socket.off("joined-room", handleRoomJoined);
        };
    }, [socket, handleRoomJoined]);

    const handleJoinRoom = () => {
        socket.emit("join-room", { emailId: email, roomId });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Join a Room
                </h1>

                <div className="mb-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <input
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        type="text"
                        placeholder="Enter Room Code"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleJoinRoom}
                >
                    Enter Room
                </button>
            </div>
        </div>
    );
}

export default RoomLobby;
