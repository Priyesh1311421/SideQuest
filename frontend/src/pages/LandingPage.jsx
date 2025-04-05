import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TypewriterEffectSmooth } from "../components/Typewritter-effect";

const LandingPage = () => {

    const words = [
        {
          text: "Where ",
        },
        {
          text: "cultures ",
        },
        {
          text: "meet, ",
        },
        {
          text: "stories ",
        },
        {
          text: "begin.",
        },
      ];

    return(
        <div className="bg-stone-200 flex flex-col items-center">
            <Header/>
            <div className="min-h-screen mt-50">
                <TypewriterEffectSmooth words={words}/>
            </div>
            <div id="about" className="flex flex-col items-center mx-10 gap-5 mb-10">
                <div className="text-3xl font-bold">
                    About
                </div>
                <div className="text-xl ">
                    In a world that’s more connected than ever, cultural understanding is still rare. Our platform brings people together to share real conversations, real traditions, and real human moments — no matter where you’re from or what language you speak.
                </div>
                <div className="text-xl">
                    Whether you're a traveler at heart, a language learner, or just curious about the world — this is your space to connect.
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage;