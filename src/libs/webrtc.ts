"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Socket } from "socket.io-client";

export function useWebRTC({
  socket,
  userId,
  receiverId,
}: {
  socket: Socket | null;
  userId?: string;
  receiverId?: string;
}) {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [callerSocketId, setCallerSocketId] = useState<string | null>(null);
  const [incomingOffer, setIncomingOffer] =
    useState<RTCSessionDescriptionInit | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  // ---- Create Peer ----
  const createPeer = useCallback(
    async (targetSocketId: string) => {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      });

      peerRef.current = pc;

      // Get media FIRST
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Attach local video
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Add tracks BEFORE offer/answer
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Remote tracks
      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // ICE
      pc.onicecandidate = (event) => {
        if (event.candidate && socket) {
          socket.emit("webrtc_ice", {
            targetSocketId,
            candidate: event.candidate,
          });
        }
      };

      // State
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          setIsInCall(true);
        }
        if (
          pc.connectionState === "failed" ||
          pc.connectionState === "disconnected"
        ) {
          endCall();
        }
      };
    },
    [socket],
  );

  // ---- Caller starts call ----
  const startCall = useCallback(async () => {
    if (!socket || !receiverId) return;

    // Ask server for receiver's socketId
    socket.emit("get_socket_id", { userId: receiverId });
  }, [socket, receiverId]);

  // Receive receiver socketId from server then create offer
  useEffect(() => {
    if (!socket) return;

    socket.on("receiver_socket_id", async ({ socketId }) => {
      await createPeer(socketId);

      const offer = await peerRef.current!.createOffer();
      await peerRef.current!.setLocalDescription(offer);

      socket.emit("webrtc_offer", {
        targetSocketId: socketId,
        offer,
      });
    });

    return () => {
      socket.off("receiver_socket_id");
    };
  }, [socket, createPeer]);

  // ---- Receiver gets offer ----
  useEffect(() => {
    if (!socket) return;

    socket.on("webrtc_offer", ({ senderSocketId, offer }) => {
      setCallerSocketId(senderSocketId);
      setIncomingOffer(offer);
      setIsReceivingCall(true);
    });

    return () => {
      socket.off("webrtc_offer");
    };
  }, [socket]);

  // ---- Accept Call ----
  const acceptCall = useCallback(async () => {
    if (!socket || !incomingOffer || !callerSocketId) return;

    await createPeer(callerSocketId);

    await peerRef.current!.setRemoteDescription(incomingOffer);

    const answer = await peerRef.current!.createAnswer();
    await peerRef.current!.setLocalDescription(answer);

    socket.emit("webrtc_answer", {
      targetSocketId: callerSocketId,
      answer,
    });

    setIsReceivingCall(false);
  }, [socket, incomingOffer, callerSocketId, createPeer]);

  // ---- Caller receives answer ----
  useEffect(() => {
    if (!socket) return;

    socket.on("webrtc_answer", async ({ answer }) => {
      await peerRef.current?.setRemoteDescription(answer);
    });

    return () => {
      socket.off("webrtc_answer");
    };
  }, [socket]);

  // ---- ICE receive ----
  useEffect(() => {
    if (!socket) return;

    socket.on("webrtc_ice", async ({ candidate }) => {
      if (peerRef.current) {
        await peerRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socket.off("webrtc_ice");
    };
  }, [socket]);

  // ---- End ----
  const endCall = useCallback(() => {
    peerRef.current?.close();
    peerRef.current = null;

    if (localVideoRef.current?.srcObject) {
      const tracks = (
        localVideoRef.current.srcObject as MediaStream
      ).getTracks();
      tracks.forEach((t) => t.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsInCall(false);
    setIsReceivingCall(false);
  }, []);

  return {
    localVideoRef,
    remoteVideoRef,
    startCall,
    acceptCall,
    endCall,
    isReceivingCall,
    isInCall,
  };
}
