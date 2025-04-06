import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../provider/Socket'
import {usePeer} from "../provider/Peer";

function RoomPage() {
    const {socket}  = useSocket()
    const {peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream} = usePeer()
    const [myStream, setMyStream ] = useState(null)
    const [remoteEmailId, setRemoteEmailId] = useState()

    const HandleNewUserJoined = useCallback(async (data) =>{
        const {emailId} = data
        console.log('New user joined room', emailId)
        const offer = await createOffer() 
        socket.emit('call-user', {emailId, offer})
        setRemoteEmailId(emailId)
    },[createOffer,socket])

    const HandleIncomingCall = useCallback(async (data)=>{
        const {from,offer} = data
        console.log("Incoming-call from ", from, offer)
        const ans = await createAnswer(offer)
        socket.emit('call-accepted', {emailId: from, ans})
        setRemoteEmailId(from)
    },[createAnswer, socket])

    const HandleCallAccepted = useCallback(async (data)=>{
        const {ans} = data;
        console.log('call Got Accepted', ans)
        await setRemoteAns(ans)
    },[setRemoteAns])

    const HandleNegotiation = useCallback(()=>{
        const localOffer = peer.localDescription
        socket.emit('call-user', {emailId: remoteEmailId, offer: localOffer})
    },[peer.localDescription, remoteEmailId, socket])

    useEffect(()=>{
        socket.on('user-joined', HandleNewUserJoined)
        socket.on('incomming-call', HandleIncomingCall)
        socket.on('call-accepted', HandleCallAccepted)

        return ()=>{
            socket.off('user-joined', HandleNewUserJoined)
            socket.off('incomming-call', HandleIncomingCall)
            socket.off('call-accepted', HandleCallAccepted)
        }
    },[HandleCallAccepted,HandleIncomingCall,HandleNewUserJoined,socket])

    useEffect(()=>{
        peer.addEventListener('negotiationneeded', HandleNegotiation)
        return ()=>{
            peer.removeEventListener('negotiationneeded', HandleNegotiation)
        }
    },[])

    const getUserMediaStream = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)
    },[])

    useEffect(()=>{
        getUserMediaStream()
    })

    return (
        <div>
            <h1>Room Page</h1>
            <h4>You are connected to {remoteEmailId}</h4>
            <button onClick={e=> sendStream(myStream)}>Send My Video</button>
            <ReactPlayer url={myStream} playing muted/>
            <ReactPlayer url={remoteStream} playing/>
        </div>
    );
}

export default RoomPage;