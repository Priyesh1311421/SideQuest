// Updated VoiceChatPage.jsx
import React from "react";
import Layout from "../components/Layout";
import RoomLobby from "../components/RoomLobby";

const VoiceChatPage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <RoomLobby />
            </div>
        </Layout>
    );
};

export default VoiceChatPage;
