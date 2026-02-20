"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMessages } from "@/app/reactQueryCalls/useMessages";

type ChatMessage = {
  _id: string;
  sender: "me" | "them";
  text?: string;
  mediaType?: "text" | "image" | "voice";
  data?: string;
  filename?: string;
  createdAt: string;
};

export function useChatMessages({
  socket,
  userId,
  receiverId,
}: {
  id?: string;
  socket: any;
  userId?: string;
  receiverId?: string;
}) {
  const { data: serverMessages = [] } = useMessages(userId, receiverId);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);
  const socketReadyRef = useRef(false);
  const serverHydratedRef = useRef(false);

  /* ---------------------------------------------
   * 1. Merge server messages (NEVER replace state)
   * --------------------------------------------- */
  // Inside useChatMessages.ts -> 1. Merge server messages
  useEffect(() => {
    if (!serverMessages || serverMessages.length === 0) return;

    setMessages((prev) => {
      const map = new Map<string, ChatMessage>();

      // Add existing messages to map
      prev.forEach((m) => {
        if (m._id) map.set(m._id, m);
      });

      // Add server messages to map (overwriting temps if IDs match)
      serverMessages.forEach((m: any) => {
        // Ensure we have a valid ID. Fallback to a temp string only if absolutely necessary
        const id = m._id || m.id;
        if (id) {
          map.set(id, {
            ...m,
            _id: id, // Normalize to _id
          });
        }
      });

      return Array.from(map.values()).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    });
  }, [serverMessages]);

  /* -----------------------------
   * 2. Typing emitter (UI calls)
   * ----------------------------- */
  const sendTypingStatus = useCallback(() => {
    if (!socket || !userId || !receiverId) return;

    socket.emit("typing", { senderId: userId, receiverId });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { senderId: userId, receiverId });
    }, 1200);
  }, [socket, userId, receiverId]);

  /* -----------------------------
   * 3. Socket listeners//handle incoming messages
   * ----------------------------- */
  useEffect(() => {
    if (!socket || !userId || !receiverId) return;
    if (socketReadyRef.current) return;

    socket.emit("register", userId);

    const handleIncoming = (data: any) => {
      const messageId =
        data.messageId ||
        `socket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      setMessages((prev) => {
        const idx = prev.findIndex((m) => m._id === data.messageId);

        if (idx !== -1) return prev;

        return [
          ...prev,
          {
            _id: messageId,
            sender: "them",
            text: data.content,
            mediaType: data.mediaType || data.type,
            data: data.data || data.mediaUrl,
            filename: data.filename,
            createdAt: data.createdAt || new Date().toISOString(),
          },
        ];
      });
    };

    socket.on("receive_message", handleIncoming);
    socket.on("receive_media", handleIncoming);

    socket.on("typing", (d: any) => {
      if (d.senderId === receiverId) setIsTyping(true);
    });

    socket.on("stop_typing", (d: any) => {
      if (d.senderId === receiverId) setIsTyping(false);
    });

    socket.on("user_online", ({ userId: id }: any) =>
      setOnlineUsers((prev) => new Set(prev).add(id)),
    );

    socket.on("user_offline", ({ userId: id }: any) =>
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }),
    );

    socket.onAny((event: any, ...args: any) => {
      console.log("SOCKET EVENT:", event, args);
    });

    socketReadyRef.current = true;
    return () => {
      socket.off("receive_message", handleIncoming);
      socket.off("receive_media", handleIncoming);
      socket.off("typing");
      socket.off("stop_typing");
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, [socket, userId, receiverId]);

  /* -----------------------------
   * 4. Send message (optimistic)
   * ----------------------------- */
  const sendMessage = useCallback(
    async ({ text, type = "text", mediaUrl, filename }: any) => {
      if (!socket || !userId || !receiverId) return;

      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${userId}`;
      const timestamp = new Date().toISOString();

      const optimistic: ChatMessage = {
        _id: tempId,
        sender: "me",
        text,
        mediaType: type,
        data: mediaUrl,
        filename,
        createdAt: timestamp,
      };

      // 1. Update UI Instantly
      setMessages((prev) => [...prev, optimistic]);
      socket.emit("stop_typing", { senderId: userId, receiverId });

      // 2. Emit Socket Instantly (Don't wait for DB!)
      socket.emit(type === "text" ? "send_message" : "send_media", {
        senderId: userId,
        receiverId,
        content: text,
        mediaType: type,
        data: mediaUrl,
        filename,
        messageId: tempId, // Send the tempId initially
        createdAt: timestamp,
      });

      // 3. Sync with DB in the background
      try {
        const res = await fetch("/api/message/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: userId,
            receiverId,
            content: text,
            type,
            mediaUrl,
            filename,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data?.success || !data?.message?._id) {
          throw new Error(data?.error || "Message save failed");
        }

        const message = data.message;

        setMessages((prev) =>
          prev.map((m) =>
            m._id === tempId
              ? { ...m, _id: message._id, createdAt: message.createdAt }
              : m,
          ),
        );

        // Optional: Emit a "message_finalized" event if you need the receiver to sync IDs
      } catch (error) {
        console.error("DB Sync Failed:", error);
        // Only remove if it actually failed
        setMessages((prev) => prev.filter((m) => m._id !== tempId));
      }
    },
    [socket, userId, receiverId],
  );

  return {
    messages,
    sendMessage,
    sendTypingStatus,
    isTyping,
    isReceiverOnline: receiverId ? onlineUsers.has(receiverId) : false,
  };
}
