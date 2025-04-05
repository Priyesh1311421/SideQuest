import { Routes, Route } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react'

import LandingPage from './pages/LandingPage'
import ExplorePage from './pages/ExplorePage'
import VoiceChatPage from './pages/VoiceChatPage'
import TextChatPage from './pages/TextChatPage'

import BrazilStory from './pages/stories/BrazilStory'
import IndiaStory from './pages/stories/IndiaStory'
import ItalyStory from './pages/stories/ItalyStory'
import JapanStory from './pages/stories/JapanStory'

import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/stories/brazil" element={<BrazilStory />} />
      <Route path="/stories/india" element={<IndiaStory />} />
      <Route path="/stories/italy" element={<ItalyStory />} />
      <Route path="/stories/japan" element={<JapanStory />} />

      {/* Sign-in / Sign-up */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
