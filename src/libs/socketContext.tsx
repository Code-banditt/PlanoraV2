"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

type SocketType = Socket | null;
export const SocketContext = createContext<SocketType>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<SocketType>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    // ✅ Correct URL with colon
    const newSocket = io("https://planora-socket.onrender.com", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 Connected to socket:", newSocket.id);

      // Register user on server
      newSocket.emit("register", session.user.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from socket:", reason);
    });

    // Optional: log all incoming messages for debugging
    newSocket.on("receive_message", (msg) => {
      console.log("📩 Received message:", msg);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [session?.user?.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
