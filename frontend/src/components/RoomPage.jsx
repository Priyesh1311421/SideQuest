import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../provider/Socket";
import { usePeer } from "../provider/Peer";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Layout from "./Layout";

function RoomPage() {
    const { socket } = useSocket();
    const {
        peer,
        createOffer,
        createAnswer,
        setRemoteAns,
        sendStream,
        remoteStream,
    } = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState("");
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    // Fix: Declare getUserMediaStream before using it
    const getUserMediaStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    }, []);

    const HandleNewUserJoined = useCallback(
        async (data) => {
            const { emailId } = data;
            console.log("New user joined room", emailId);
            const offer = await createOffer();
            socket.emit("call-user", { emailId, offer });
            setRemoteEmailId(emailId);
        },
        [createOffer, socket]
    );

    const HandleIncomingCall = useCallback(
        async (data) => {
            const { from, offer } = data;
            console.log("Incoming-call from ", from, offer);
            const ans = await createAnswer(offer);
            socket.emit("call-accepted", { emailId: from, ans });
            setRemoteEmailId(from);
        },
        [createAnswer, socket]
    );

    const HandleCallAccepted = useCallback(
        async (data) => {
            const { ans } = data;
            console.log("Call Got Accepted", ans);
            await setRemoteAns(ans);
            setIsConnected(true);
        },
        [setRemoteAns]
    );

    const HandleNegotiation = useCallback(() => {
        const localOffer = peer.localDescription;
        socket.emit("call-user", { emailId: remoteEmailId, offer: localOffer });
    }, [peer?.localDescription, remoteEmailId, socket]);

    useEffect(() => {
        socket.on("user-joined", HandleNewUserJoined);
        socket.on("incomming-call", HandleIncomingCall);
        socket.on("call-accepted", HandleCallAccepted);

        return () => {
            socket.off("user-joined", HandleNewUserJoined);
            socket.off("incomming-call", HandleIncomingCall);
            socket.off("call-accepted", HandleCallAccepted);
        };
    }, [HandleCallAccepted, HandleIncomingCall, HandleNewUserJoined, socket]);

    useEffect(() => {
        if (peer) {
            peer.addEventListener("negotiationneeded", HandleNegotiation);
            return () => {
                peer.removeEventListener(
                    "negotiationneeded",
                    HandleNegotiation
                );
            };
        }
    }, [HandleNegotiation, peer]);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    const toggleAudio = useCallback(() => {
        if (myStream) {
            myStream.getAudioTracks().forEach((track) => {
                track.enabled = !isAudioEnabled;
            });
            setIsAudioEnabled(!isAudioEnabled);
        }
    }, [myStream, isAudioEnabled]);

    const toggleVideo = useCallback(() => {
        if (myStream) {
            myStream.getVideoTracks().forEach((track) => {
                track.enabled = !isVideoEnabled;
            });
            setIsVideoEnabled(!isVideoEnabled);
        }
    }, [myStream, isVideoEnabled]);

    const handleSendStream = useCallback(() => {
        if (myStream) {
            sendStream(myStream);
            setIsConnected(true);
        }
    }, [myStream, sendStream]);

    return (
        <Layout>


        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold mb-2">Video Chat Room</h1>
                {remoteEmailId ? (
                    <h2 className="text-xl text-green-600">
                        Connected with: {remoteEmailId}
                    </h2>
                ) : (
                    <h2 className="text-xl text-gray-500">
                        Waiting for someone to join...
                    </h2>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
                        <span>Your Video</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={toggleAudio}
                                className={`p-2 rounded-full ${
                                    isAudioEnabled
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                                title={
                                    isAudioEnabled
                                        ? "Mute Audio"
                                        : "Unmute Audio"
                                }
                            >
                                {isAudioEnabled ? (
                                    <Mic size={20} />
                                ) : (
                                    <MicOff size={20} />
                                )}
                            </button>
                            <button
                                onClick={toggleVideo}
                                className={`p-2 rounded-full ${
                                    isVideoEnabled
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                                title={
                                    isVideoEnabled
                                        ? "Turn Off Video"
                                        : "Turn On Video"
                                }
                            >
                                {isVideoEnabled ? (
                                    <Video size={20} />
                                ) : (
                                    <VideoOff size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="aspect-video bg-black">
                        {myStream ? (
                            <ReactPlayer
                                url={myStream}
                                playing
                                muted
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: "16/9" }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white">
                                Loading your camera...
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-800 text-white p-2">
                        <span>Remote Video</span>
                    </div>
                    <div className="aspect-video bg-black">
                        {remoteStream ? (
                            <ReactPlayer
                                url={remoteStream}
                                playing
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: "16/9" }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white">
                                {isConnected
                                    ? "Waiting for remote video..."
                                    : "No one connected yet"}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!isConnected && myStream && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleSendStream}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Connect My Video & Audio
                    </button>
                </div>
            )}
        </div>
        </Layout>
    );
}

export default RoomPage;
