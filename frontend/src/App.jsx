import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VoiceChatPage from "./pages/VoiceChatPage";
import TextChatPage from "./pages/TextChatPage";
import StoryPage from "./components/StoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

import {
    brazilStoryData,
    indiaStoryData,
    italyStoryData,
    japanStoryData,
} from "./data/storyData.js";
import ChatRoomPage from "./pages/ChatRoomPage.jsx";
import { SocketProvider } from "./provider/Socket.jsx";
import { PeerProvider } from "./provider/Peer.jsx";
import RoomPage from "./components/RoomPage.jsx";

function App() {
    return (
        <SocketProvider>
            <PeerProvider>
                <ProtectedRoute>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<LandingPage />} />
                        
                        {/* Cultural stories routes - unprotected */}
                        <Route
                            path="/stories/brazil"
                            element={<StoryPage storyData={brazilStoryData} />}
                        />
                        <Route
                            path="/stories/india"
                            element={<StoryPage storyData={indiaStoryData} />}
                        />
                        <Route
                            path="/stories/italy"
                            element={<StoryPage storyData={italyStoryData} />}
                        />
                        <Route
                            path="/stories/japan"
                            element={<StoryPage storyData={japanStoryData} />}
                        />
                        
                        {/* Protected routes */}
                        <Route path="/voice-chat/" element={<VoiceChatPage />} />
                        <Route path="/text-chat" element={<TextChatPage />} />
                        <Route path="/chat-room/:roomId" element={<ChatRoomPage />} />
                        <Route path="/room/:roomId" element={<RoomPage />} />
                    </Routes>
                </ProtectedRoute>
            </PeerProvider>
        </SocketProvider>
    );
}

export default App;