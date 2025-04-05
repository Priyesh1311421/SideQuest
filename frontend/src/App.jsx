import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import LandingPage from "./pages/LandingPage";
import VoiceChatPage from "./pages/VoiceChatPage";
import TextChatPage from "./pages/TextChatPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import StoryPage from "./components/StoryPage";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import ProtectedRoute from "./components/ProtectedRoute";

import {
    brazilStoryData,
    indiaStoryData,
    italyStoryData,
    japanStoryData,
} from "./data/storyData";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        setAuthChecked(true); // authentication check is done
    }, []);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        setIsAuthenticated(true);
    };

    const openSignupModal = () => setIsSignupModalOpen(true);
    const closeSignupModal = () => setIsSignupModalOpen(false);

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/voice-chat"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            openLoginModal={openLoginModal}
                        >
                            <VoiceChatPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/text-chat"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            openLoginModal={openLoginModal}
                        >
                            <TextChatPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/chat-room/:roomId" element={<ChatRoomPage />} />

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

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                openSignupModal={openSignupModal}
            />
            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={closeSignupModal}
                openLoginModal={openLoginModal}
            />
        </>
    );
}

export default App;
