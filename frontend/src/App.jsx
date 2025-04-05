import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import VoiceChatPage from "./pages/VoiceChatPage";
import TextChatPage from "./pages/TextChatPage";
import AboutPage from "./pages/AboutPage";
import StoryPage from "./components/StoryPage";

// Story data - in a real application, this would likely be fetched from an API
import { brazilStoryData, indiaStoryData, italyStoryData, japanStoryData } from "./data/storyData.js";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/voice-chat" element={<VoiceChatPage />} />
      <Route path="/text-chat" element={<TextChatPage />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Story routes using the reusable StoryPage component */}
      <Route path="/stories/brazil" element={<StoryPage storyData={brazilStoryData} />} />
      <Route path="/stories/india" element={<StoryPage storyData={indiaStoryData} />} />
      <Route path="/stories/italy" element={<StoryPage storyData={italyStoryData} />} />
      <Route path="/stories/japan" element={<StoryPage storyData={japanStoryData} />} />
    </Routes>
  );
}

export default App;