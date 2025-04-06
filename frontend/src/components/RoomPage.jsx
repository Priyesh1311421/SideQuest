import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../provider/Socket'
import { usePeer } from "../provider/Peer";

function RoomPage() {
    const { socket } = useSocket()
    const { 
        peer, 
        createOffer, 
        createAnswer, 
        setRemoteAns, 
        sendStream, 
        remoteStream, 
        connectionState, 
        iceCandidates, 
        addIceCandidate,
        restartIce 
    } = usePeer()
    
    const [myStream, setMyStream] = useState(null)
    const [remoteEmailId, setRemoteEmailId] = useState()
    const [streamSent, setStreamSent] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)

    // Handle new user joining the room
    const HandleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data
        console.log('New user joined room', emailId)
        setIsConnecting(true)
        
        try {
            // Create and send offer
            const offer = await createOffer()
            socket.emit('call-user', { emailId, offer })
            setRemoteEmailId(emailId)
            
            // Send ICE candidates
            iceCandidates.forEach(candidate => {
                socket.emit('ice-candidate', { 
                    to: emailId, 
                    candidate 
                })
            })
        } catch (error) {
            console.error("Error handling new user join:", error)
            setIsConnecting(false)
        }
    }, [createOffer, socket, iceCandidates])

    // Handle incoming call
    const HandleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data
        console.log("Incoming call from", from, offer)
        setIsConnecting(true)
        
        try {
            // Create and send answer
            const ans = await createAnswer(offer)
            socket.emit('call-accepted', { emailId: from, ans })
            setRemoteEmailId(from)
            
            // Send ICE candidates
            iceCandidates.forEach(candidate => {
                socket.emit('ice-candidate', { 
                    to: from, 
                    candidate 
                })
            })
        } catch (error) {
            console.error("Error handling incoming call:", error)
            setIsConnecting(false)
        }
    }, [createAnswer, socket, iceCandidates])

    // Handle call acceptance
    const HandleCallAccepted = useCallback(async (data) => {
        const { ans } = data
        console.log('Call got accepted', ans)
        
        try {
            await setRemoteAns(ans)
        } catch (error) {
            console.error("Error setting remote answer:", error)
        }
    }, [setRemoteAns])

    // Handle ICE candidate exchange
    const HandleIceCandidate = useCallback(async (data) => {
        try {
            const { candidate } = data
            console.log('Received ICE candidate:', candidate)
            await addIceCandidate(candidate)
        } catch (error) {
            console.error("Error adding ICE candidate:", error)
        }
    }, [addIceCandidate])

    // Handle negotiation
    const HandleNegotiation = useCallback(async () => {
        console.log("Negotiation needed")
        
        if (!remoteEmailId || peer.signalingState === 'closed') {
            console.log("Cannot negotiate: no remote peer or connection closed")
            return
        }
        
        try {
            // Create a new offer
            const localOffer = await createOffer()
            socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer })
            
            // Send ICE candidates
            iceCandidates.forEach(candidate => {
                socket.emit('ice-candidate', { 
                    to: remoteEmailId, 
                    candidate 
                })
            })
        } catch (error) {
            console.error("Error during negotiation:", error)
        }
    }, [createOffer, remoteEmailId, socket, peer, iceCandidates])

    // Handle connection failure
    const handleConnectionFailure = useCallback(async () => {
        if (connectionState === 'failed' || connectionState === 'disconnected') {
            console.log("Connection failed, attempting to restart")
            
            try {
                if (remoteEmailId) {
                    const offer = await restartIce()
                    if (offer) {
                        socket.emit('call-user', { emailId: remoteEmailId, offer })
                    }
                }
            } catch (error) {
                console.error("Error restarting connection:", error)
            }
        }
    }, [connectionState, remoteEmailId, restartIce, socket])

    // Socket event listeners
    useEffect(() => {
        socket.on('user-joined', HandleNewUserJoined)
        socket.on('incomming-call', HandleIncomingCall)
        socket.on('call-accepted', HandleCallAccepted)
        socket.on('ice-candidate', HandleIceCandidate)
        
        return () => {
            socket.off('user-joined', HandleNewUserJoined)
            socket.off('incomming-call', HandleIncomingCall)
            socket.off('call-accepted', HandleCallAccepted)
            socket.off('ice-candidate', HandleIceCandidate)
        }
    }, [
        HandleCallAccepted, 
        HandleIncomingCall, 
        HandleNewUserJoined, 
        HandleIceCandidate, 
        socket
    ])

    // Peer connection event listeners
    useEffect(() => {
        peer.addEventListener('negotiationneeded', HandleNegotiation)
        
        return () => {
            peer.removeEventListener('negotiationneeded', HandleNegotiation)
        }
    }, [HandleNegotiation, peer])

    // Monitor connection state
    useEffect(() => {
        console.log('Connection state:', connectionState)
        
        if (connectionState === 'connected') {
            setIsConnecting(false)
        }
        
        if (connectionState === 'failed' || connectionState === 'disconnected') {
            handleConnectionFailure()
        }
    }, [connectionState, handleConnectionFailure])

    // Emit new ICE candidates
    useEffect(() => {
        if (remoteEmailId && iceCandidates.length > 0) {
            // Send the latest ICE candidate
            const latestCandidate = iceCandidates[iceCandidates.length - 1]
            socket.emit('ice-candidate', { 
                to: remoteEmailId, 
                candidate: latestCandidate 
            })
        }
    }, [iceCandidates, remoteEmailId, socket])

    // Get user media stream
    const getUserMediaStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            console.log("Got local media stream:", stream)
            setMyStream(stream)
        } catch (error) {
            console.error("Error accessing media devices:", error)
        }
    }, [])

    // Initialize user media
    useEffect(() => {
        getUserMediaStream()
        
        return () => {
            // Clean up media stream when component unmounts
            if (myStream) {
                myStream.getTracks().forEach(track => track.stop())
            }
        }
    }, [getUserMediaStream]) // Only run once on component mount

    // Send stream when ready
    const handleSendStream = useCallback(() => {
        if (myStream && !streamSent) {
            console.log("Sending stream to peer:", myStream)
            sendStream(myStream)
            setStreamSent(true)
        }
    }, [myStream, sendStream, streamSent])

    // Auto-send stream when we have it and remote connection
    useEffect(() => {
        if (myStream && remoteEmailId && !streamSent) {
            handleSendStream()
        }
    }, [myStream, remoteEmailId, streamSent, handleSendStream])

    console.log("Remote stream available:", !!remoteStream)
    console.log("Connection state:", connectionState)

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room Page</h1>
            <h4 className="mb-4">
                {remoteEmailId 
                    ? `You are connected to ${remoteEmailId} (${connectionState})` 
                    : "You are not connected to anyone yet"}
            </h4>
            
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-semibold mb-2">Your Video</h3>
                    <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "300px" }}>
                        {myStream ? (
                            <ReactPlayer 
                                url={myStream} 
                                playing 
                                muted 
                                width="100%" 
                                height="300px"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-64">
                                <p>Loading your video...</p>
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={handleSendStream}
                        disabled={streamSent || !myStream || !remoteEmailId}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        {streamSent ? "Video Sent" : "Send My Video"}
                    </button>
                </div>
                
                <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-semibold mb-2">Remote Video</h3>
                    <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "300px" }}>
                        {remoteStream ? (
                            <ReactPlayer 
                                url={remoteStream} 
                                playing 
                                width="100%" 
                                height="300px"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-64">
                                {isConnecting ? (
                                    <p>Connecting... ({connectionState})</p>
                                ) : remoteEmailId ? (
                                    <p>Waiting for remote video...</p>
                                ) : (
                                    <p>Waiting for connection...</p>
                                )}
                            </div>
                        )}
                    </div>
                    {connectionState === 'failed' && remoteEmailId && (
                        <button 
                            onClick={handleConnectionFailure}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Retry Connection
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomPage;