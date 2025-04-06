import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VoiceChatPage from "./pages/VoiceChatPage";
import TextChatPage from "./pages/TextChatPage";
import StoryPage from "./components/StoryPage";

import {
    brazilStoryData,
    indiaStoryData,
    italyStoryData,
    japanStoryData,
} from "./data/storyData.js";
import ChatRoomPage from "./pages/ChatRoomPage.jsx";
import { Socket } from "socket.io-client";
import { SocketProvider } from "./provider/Socket.jsx";
import { PeerProvider } from "./provider/Peer.jsx";
import RoomPage from "./components/videoChat/RoomPage.jsx";

function App() {
    return (
        <SocketProvider>
            <PeerProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/voice-chat/" element={<VoiceChatPage />} />
                    <Route path="/text-chat" element={<TextChatPage />} />
                    <Route
                        path="/chat-room/:roomId"
                        element={<ChatRoomPage />}
                    />
                    <Route path="/room/:roomId" element={<RoomPage />} />

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
                </Routes>
            </PeerProvider>
        </SocketProvider>
    );
}

export default App;
