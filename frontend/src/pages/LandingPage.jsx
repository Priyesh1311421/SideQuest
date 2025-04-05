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
            <Footer/>
        </div>
    )
}

export default LandingPage;