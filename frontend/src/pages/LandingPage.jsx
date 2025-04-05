// pages/LandingPage.jsx
import React from "react";
import Layout from "../components/Layout";
import { TypewriterEffectSmooth } from "../components/Typewritter-effect";
import Chat from "./Chat";

const LandingPage = () => {
  const words = [
    { text: "Where " },
    { text: "cultures " },
    { text: "meet, " },
    { text: "stories " },
    { text: "begin." },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="min-h-screen mt-50">
          <TypewriterEffectSmooth words={words} />
        </div>
        <div id="about" className="flex flex-col items-center mx-10 gap-5 mb-10">
          <div className="text-3xl font-bold">About</div>
          <div className="text-xl">
            In a world that's more connected than ever, cultural understanding is still rare. Our platform brings people together to share real conversations, real traditions, and real human moments — no matter where you're from or what language you speak.
          </div>
          <div className="text-xl">
            Whether you're a traveler at heart, a language learner, or just curious about the world — this is your space to connect.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
