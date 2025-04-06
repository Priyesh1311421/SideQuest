// Updated VoiceChatPage.jsx
import React from "react";
import Layout from "../components/Layout";
import RoomLobby from "../components/RoomLobby";

const VoiceChatPage = () => {
    return (
        <Layout>
            <div className="container mx-auto">
                <RoomLobby />
            </div>
        </Layout>
    );
};

export default VoiceChatPage;
