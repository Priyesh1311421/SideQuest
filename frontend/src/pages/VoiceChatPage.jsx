import React from "react";
import Layout from "../components/Layout";
import VideoChat from "../components/videoChat/VideoChat";

const VoiceChatPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Voice Chat</h1>
        <div>
          <VideoChat />
        </div>
      </div>
    </Layout>
  );
};

export default VoiceChatPage;
