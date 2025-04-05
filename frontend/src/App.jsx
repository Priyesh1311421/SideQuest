import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import VoiceChatPage from './pages/VoiceChatPage';
import TextChatPage from './pages/TextChatPage';

import BrazilStory from "./pages/stories/BrazilStory";
import IndiaStory from "./pages/stories/IndiaStory";
import ItalyStory from "./pages/stories/ItalyStory";
import JapanStory from "./pages/stories/JapanStory";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
            <Route path='/voice-chat' element={<VoiceChatPage />} />
            <Route path='/text-chat' element={<TextChatPage />} />

            <Route path="/stories/brazil" element={<BrazilStory />} />
            <Route path="/stories/india" element={<IndiaStory />} />
            <Route path="/stories/italy" element={<ItalyStory />} />
            <Route path="/stories/japan" element={<JapanStory />} />
        </Routes>
    </Router>
  )
}

export default App
