import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, ArrowUpRight, ArrowDownRight } from "lucide-react";

const ChatRoomPage = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const roomName = location.state?.roomName || "Chat Room";

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const ws = useRef(null);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Fetch initial messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/message/${roomId}?limit=100`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const formattedMessages = response.data.map((msg) => ({
                    senderId: msg.sender || "Unknown",
                    message: msg.content,
                    roomId: roomId,
                    timestamp: new Date(
                        msg.createdAt || Date.now()
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (roomId) {
            fetchMessages();
        }
    }, [roomId, token]);

    // WebSocket connection
    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8080?userId=${userId}`);

        ws.current.onopen = () => {
            console.log("Connected to WebSocket");

            const tryJoin = () => {
                if (ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({ type: "join", roomId }));
                } else {
                    setTimeout(tryJoin, 100);
                }
            };

            tryJoin();
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "chat" && data.roomId === roomId) {
                setMessages((prev) => [
                    ...prev,
                    {
                        senderId: data.senderId,
                        message: data.message,
                        roomId: data.roomId,
                        timestamp: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
            }

            if (data.type === "joined") {
                console.log(`Joined room ${data.roomId}`);
            }
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.current.onclose = () => {
            console.log("Disconnected from WebSocket");
        };

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ type: "leave_room", roomId }));
                ws.current.close();
            }
        };
    }, [userId, roomId]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (
            ws.current &&
            ws.current.readyState === WebSocket.OPEN &&
            newMessage.trim() !== ""
        ) {
            ws.current.send(
                JSON.stringify({
                    type: "chat",
                    roomId,
                    message: newMessage,
                    senderId: userId,
                })
            );
            setNewMessage("");
        }
    };

    const handleBackToRooms = () => {
        navigate("/text-chat");
    };

    return (
        <Layout>
          <div className="flex flex-col h-screen max-h-[calc(100vh-4rem)] relative max-w-4xl mx-auto px-6">
                {/* Fixed Header */}
                <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                            onClick={handleBackToRooms}
                        >
                            <ArrowLeft size={18} />
                        </Button>
                        <h1 className="text-xl font-bold">{roomName}</h1>
                    </div>
                </div>

                {/* Messages container with proper padding */}
                <div
                    className="flex-1 overflow-y-auto p-6 bg-gray-50"
                    ref={chatContainerRef}
                >
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>No messages yet. Be the first to say hello!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((msg, idx) => {
                                const isCurrentUser = msg.senderId === userId;
                                return (
                                    <div
                                        key={idx}
                                        className={`flex ${
                                            isCurrentUser
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`flex max-w-[80%] ${
                                                isCurrentUser
                                                    ? "flex-row-reverse"
                                                    : "flex-row"
                                            }`}
                                        >
                                            <div
                                                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                                                    isCurrentUser
                                                        ? "bg-blue-500 ml-2"
                                                        : "bg-gray-200 mr-2"
                                                }`}
                                            >
                                                {isCurrentUser ? (
                                                    <ArrowUpRight
                                                        size={14}
                                                        className="text-white"
                                                    />
                                                ) : (
                                                    <ArrowDownRight
                                                        size={14}
                                                        className="text-gray-600"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <div
                                                    className={`rounded-2xl py-3 px-4 ${
                                                        isCurrentUser
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-white border shadow-sm"
                                                    }`}
                                                >
                                                    <p>{msg.message}</p>
                                                </div>
                                                <div
                                                    className={`text-xs text-gray-500 mt-1 ${
                                                        isCurrentUser
                                                            ? "text-right"
                                                            : "text-left"
                                                    }`}
                                                >
                                                    {msg.timestamp}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>
                    )}
                </div>

                {/* Message input */}
                <div className="border-t bg-white p-4 sticky bottom-0 z-10">
                    <div className="flex space-x-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button onClick={sendMessage} size="icon">
                            <Send size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChatRoomPage;
