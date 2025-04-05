import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, User, Users, Loader2 } from "lucide-react";

// Function to call DeepSeek R1 via OpenRouter API
const callOpenRouter = async (prompt) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Store securely in .env
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: "You are a helpful assistant who only translates the given text " },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  console.log(data);
  return data.choices?.[0]?.message?.content || "Translation failed.";
};

// Translation function
const translate = async (text) => {
  const preferredLanguage = localStorage.getItem("language") || "english";
  const prompt = `Translate the following text only dont give any explanation to ${preferredLanguage}:\n\n"${text} "`;

  try {
    const result = await callOpenRouter(prompt);
    return result;
  } catch (error) {
    console.error("Translation failed:", error);
    return "Translation error.";
  }
};

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const roomName = location.state?.roomName || "Chat Room";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingTranslations, setLoadingTranslations] = useState({});
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

  const handleTranslate = async (msg, index) => {
    // Set loading state for this specific message
    setLoadingTranslations(prev => ({ ...prev, [index]: true }));
    
    try {
      const translated = await translate(msg.message);

      setMessages((prevMessages) => {
        const updated = [...prevMessages];
        updated[index].message = translated;
        return updated;
      });
    } finally {
      // Clear loading state regardless of success or failure
      setLoadingTranslations(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen max-h-[calc(100vh-4rem)] relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 rounded-full"
              onClick={handleBackToRooms}
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{roomName}</h1>
                <p className="text-xs text-gray-500">{messages.length} messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-blue-50 to-gray-50" 
          ref={chatContainerRef}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users size={32} className="text-blue-600" />
              </div>
              <p className="text-center font-medium">No messages yet.</p>
              <p className="text-sm text-center text-gray-400">Be the first to say hello in this room!</p>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {messages.map((msg, idx) => {
                const isCurrentUser = msg.senderId === userId;
                const showDateDivider = idx === 0 || 
                  new Date(messages[idx-1]?.timestamp).toLocaleDateString() !== 
                  new Date(msg.timestamp).toLocaleDateString();
                
                return (
                  <div key={idx}>
                    {showDateDivider && (
                      <div className="flex justify-center my-4">
                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          Today
                        </div>
                      </div>
                    )}
                    <div
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
                    >
                      <div className={`flex max-w-[75%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                        <div
                          className={`flex items-center justify-center h-8 w-8 rounded-full 
                            ${isCurrentUser ? "bg-blue-600 ml-2" : "bg-gray-300 mr-2"}`}
                        >
                          <User size={14} className={isCurrentUser ? "text-white" : "text-gray-700"} />
                        </div>
                        <div>
                          <div
                            className={`rounded-2xl py-3 px-4 
                              ${isCurrentUser
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                              }`}
                          >
                            <p className="leading-relaxed">{msg.message}</p>
                          </div>
                          <div
                            className={`text-xs text-gray-500 mt-1 flex items-center
                              ${isCurrentUser ? "justify-end" : "justify-start"}`}
                          >
                            <span>{msg.timestamp}</span>
                            {!isCurrentUser && (
                              <button
                                className="ml-3 flex items-center text-blue-600 hover:underline hover:cursor-pointer"
                                onClick={() => handleTranslate(msg, idx)}
                                disabled={loadingTranslations[idx]}
                              >
                                {loadingTranslations[idx] ? (
                                  <>
                                    <Loader2 size={12} className="mr-1 animate-spin" />
                                    <span>Translating...</span>
                                  </>
                                ) : (
                                  <span>Translate</span>
                                )}
                              </button>
                            )}
                          </div>
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

        {/* Input */}
        <div className="border-t bg-white p-4 sticky bottom-0 z-10 shadow-lg">
          <div className="flex space-x-2 bg-gray-50 p-1 rounded-full shadow-inner">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border-none focus:ring-0 bg-transparent"
            />
            <Button 
              onClick={sendMessage} 
              size="icon" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoomPage;