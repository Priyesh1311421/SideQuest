import React, { useMemo, useContext, useState, useCallback, useEffect } from 'react';

// Define PeerContext
const PeerContext = React.createContext(null);

// Custom hook to access the PeerContext
export const usePeer = () => {
  return useContext(PeerContext);
};

export const PeerProvider = (props) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionState, setConnectionState] = useState('new');
  const [iceCandidates, setIceCandidates] = useState([]);
  
  // Create RTCPeerConnection with ICE servers
  const peer = useMemo(() => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302"
          ]
        }
      ]
    });
    
    // Log connection state changes
    peerConnection.addEventListener('connectionstatechange', () => {
      setConnectionState(peerConnection.connectionState);
      console.log('Connection state changed:', peerConnection.connectionState);
    });
    
    return peerConnection;
  }, []);

  // Handle incoming tracks from remote peer
  const handleTrackEvent = useCallback((ev) => {
    console.log('Track received:', ev);
    const streams = ev.streams;
    if (streams && streams[0]) {
      console.log('Setting remote stream from track event');
      setRemoteStream(streams[0]);
    }
  }, []);
  
  // Create and set local offer
  const createOffer = async () => {
    try {
      const offer = await peer.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      
      console.log('Created offer:', offer);
      await peer.setLocalDescription(offer);
      
      // Wait for ICE gathering to complete
      await waitForIceGathering(peer);
      
      return peer.localDescription;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  };
  
  // Create and set local answer
  const createAnswer = async (offer) => {
    try {
      if (offer) {
        console.log('Setting remote offer:', offer);
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
      }
      
      const answer = await peer.createAnswer();
      console.log('Created answer:', answer);
      await peer.setLocalDescription(answer);
      
      // Wait for ICE gathering to complete
      await waitForIceGathering(peer);
      
      return peer.localDescription;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  };
  
  // Set remote answer
  const setRemoteAns = async (ans) => {
    try {
      if (ans && peer.signalingState !== 'stable') {
        console.log('Setting remote answer:', ans);
        await peer.setRemoteDescription(new RTCSessionDescription(ans));
        console.log('Remote answer set successfully');
      }
    } catch (error) {
      console.error('Error setting remote answer:', error);
      throw error;
    }
  };
  
  // Add remote ICE candidate
  const addIceCandidate = async (candidate) => {
    try {
      if (candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('Added ICE candidate:', candidate);
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };
  
  // Send media stream to remote peer
  const sendStream = async (stream) => {
    try {
      if (!stream) {
        console.error('No stream to send');
        return;
      }
      
      console.log('Sending stream to peer:', stream);
      const tracks = stream.getTracks();
      
      // Remove any existing senders
      const senders = peer.getSenders();
      senders.forEach(sender => {
        if (sender.track) {
          peer.removeTrack(sender);
        }
      });
      
      // Add new tracks
      for (const track of tracks) {
        console.log('Adding track to peer connection:', track.kind);
        peer.addTrack(track, stream);
      }
      
      console.log('All tracks added to peer connection');
    } catch (error) {
      console.error('Error sending stream:', error);
    }
  };
  
  // Restart ICE if connection fails
  const restartIce = async () => {
    try {
      if (peer.connectionState === 'failed' || peer.connectionState === 'disconnected') {
        console.log('Restarting ICE connection');
        const offer = await peer.createOffer({ iceRestart: true });
        await peer.setLocalDescription(offer);
        return offer;
      }
    } catch (error) {
      console.error('Error restarting ICE:', error);
    }
  };
  
  // Helper function to wait for ICE gathering to complete
  const waitForIceGathering = (peerConnection) => {
    return new Promise(resolve => {
      if (peerConnection.iceGatheringState === 'complete') {
        resolve();
        return;
      }
      
      const checkState = () => {
        if (peerConnection.iceGatheringState === 'complete') {
          peerConnection.removeEventListener('icegatheringstatechange', checkState);
          resolve();
        }
      };
      
      peerConnection.addEventListener('icegatheringstatechange', checkState);
      
      // Set a timeout just in case
      setTimeout(resolve, 5000);
    });
  };
  
  // Handle ICE candidate events
  useEffect(() => {
    const handleIceCandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
        setIceCandidates(prev => [...prev, event.candidate]);
      }
    };
    
    peer.addEventListener('icecandidate', handleIceCandidate);
    
    return () => {
      peer.removeEventListener('icecandidate', handleIceCandidate);
    };
  }, [peer]);
  
  // Handle track events
  useEffect(() => {
    peer.addEventListener('track', handleTrackEvent);
    
    return () => {
      peer.removeEventListener('track', handleTrackEvent);
    };
  }, [handleTrackEvent, peer]);
  
  // Close peer connection on unmount
  useEffect(() => {
    return () => {
      if (peer) {
        peer.close();
      }
    };
  }, [peer]);

  return (
    <PeerContext.Provider value={{
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
    }}>
      {props.children}
    </PeerContext.Provider>
  );
};