// import React, { useMemo } from 'react'

// const PeerContext = React.createContext(null)

// export const usePeer = () => React.createContext(PeerContext)

// export const PeerProvider = (props)=>{
//     const peer = useMemo(()=> new RTCPeerConnection({
//         iceServers: [
//             {
//                 urls: [
//                     "stun:stun.l.google.com:19302",
//                     "stun:global.stun.twilio.com:3478"
//                 ]
//             }
//         ]
//     }), [])

//     const createOffer = async ()=>{
//         const offer = await peer.createOffer()
//         await peer.setLocalDescription(offer)
//         return offer
//     }

//     const  createAnswer = async(offer)=>{
//         await peer.setRemoteDescription(offer)
//         const answer = await peer.createAnswer()
//         await peer.setLocalDescription(answer)
//         return answer
//     }

//     const setRemoteAns = async(ans)=>{
//         await peer.setRemoteDescription(ans)
//     }

//     return <PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAns}}>
//         {props.children}
//     </PeerContext.Provider>
// }

import React, { useMemo, useContext, useEffect, useState, useCallback } from 'react';

// Define your PeerContext here
const PeerContext = React.createContext(null);

// Create the custom hook to access the PeerContext
export const usePeer = () => {
    return useContext(PeerContext); // Use the context to get the value
};

// Define your PeerProvider
export const PeerProvider = (props) => {
    const [remoteStream,setRemoteStream] = useState(null)
    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ]
            }
        ]
    }), []);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    };

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    };

    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans);
    };

    const sendStream = async(stream)=>{
        const tracks = stream.getTracks()
        for(const track of tracks){
            peer.addTrack(track,stream)
        }
    }

    const HandleTrackEvent = useCallback((ev)=>{
        const streams = ev.streams;
        setRemoteStream(streams[0])
    },[])

    

    useEffect(()=>{
        peer.addEventListener('track', HandleTrackEvent)
        return ()=>{
            peer.removeEventListener('track', HandleTrackEvent)
        }
    },[HandleTrackEvent,peer])

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream}}>
            {props.children}
        </PeerContext.Provider>
    );
};