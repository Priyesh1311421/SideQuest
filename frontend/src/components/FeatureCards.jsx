import React from "react";

const features = [
  {
    id: "text-chat",
    title: "Text Chat Rooms",
    description:
      "Join public chat rooms based on countries or cultural events. Messages are instantly translated, so you can chat, learn, and connect — no language barrier!",
    image: "/images/landing/text-chat-preview.png",
    buttonText: "Enter Text Chat",
    link: "/text-chat",
  },
  {
    id: "voice-chat",
    title: "Video Chat (with Translation)",
    description:
      "Speak directly with people from around the world. Video chat includes live translation, making conversation natural, immersive, and barrier-free.",
    image: "/images/landing/voice-chat-preview.png",
    buttonText: "Start Interacting",
    link: "/voice-chat",
  },
  {
    id: "cultural-stories",
    title: "Cultural Stories",
    description:
      "Walk through immersive, animated stories filled with music, food, art, and festivals. A new way to experience the heart of each culture.",
    image: "/images/landing/cultural-stories-preview.png",
    buttonText: "Explore Stories",
    link: "/stories/brazil",
  },
];

const FeatureSections = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-20">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-10`}
          >
            <div className="md:w-1/2">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto rounded-xl object-cover shadow-md"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
              <a
                href={feature.link}
                className="inline-block bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {feature.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSections;
