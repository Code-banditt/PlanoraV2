"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import base64url from "base64url";

import { useSocket } from "@/libs/socketContext";
import { useUser } from "@/app/reactQueryCalls/useUser";
import { useWebRTC } from "@/libs/webrtc";
import { useChatMessages } from "@/app/lib/useChatMessages";

import {
  Send,
  Video,
  ArrowLeft,
  MoreVertical,
  Image as ImageIcon,
  Mic,
  MessageSquare,
  X,
} from "lucide-react";

export default function ChatPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const socket = useSocket();

  const userId = session?.user?.id;
  const encoded = params?.receiverId as string | undefined;
  const receiverId = encoded ? base64url.decode(encoded) : undefined;

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Voice Recording Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const {
    messages,
    sendMessage,
    sendTypingStatus,
    isTyping,
    isReceiverOnline,
  } = useChatMessages({
    socket,
    userId,
    receiverId,
  });

  const { data: receiverData } = useUser(receiverId);
  const { startCall } = useWebRTC({ socket, userId, receiverId });

  const receiverName =
    receiverData?.user?.name || receiverData?.username || "User";
  const receiverInitial = receiverName.charAt(0).toUpperCase();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendText = () => {
    if (!input.trim()) return;
    sendMessage({ text: input.trim(), type: "text" });
    setInput("");
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      sendMessage({
        type: "image",
        mediaUrl: reader.result as string,
        filename: file.name,
        text: "Image",
      });
    };
    reader.readAsDataURL(file);
  };

  // --- Voice Recording Logic Restored ---
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const reader = new FileReader();
          reader.onload = () => {
            sendMessage({
              type: "voice",
              mediaUrl: reader.result as string,
              filename: `voice_${Date.now()}.webm`,
            });
          };
          reader.readAsDataURL(blob);
          stream.getTracks().forEach((t) => t.stop());
        };

        recorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  if (!userId || !receiverId)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 font-sans">
      {/* Header: Instagram Style */}
      <header className="border-b px-4 py-3 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/Dashboard/chats")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] rounded-full">
              <div className="w-full h-full bg-white rounded-full p-[2px]">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                  {receiverInitial}
                </div>
              </div>
            </div>
            {isReceiverOnline && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-[15px] leading-tight">
              {receiverName}
            </h2>
            <span className="text-[11px] text-gray-500 font-medium">
              {isTyping
                ? "typing..."
                : isReceiverOnline
                  ? "Active now"
                  : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={startCall}
            className="p-2 hover:bg-gray-50 rounded-full"
          >
            <Video className="w-6 h-6 stroke-[1.5px]" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-full">
            <MoreVertical className="w-6 h-6 stroke-[1.5px]" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {messages.length === 0 && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 opacity-20" />
            </div>
            <p className="text-sm font-medium">No messages yet</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender === "me";
            const isLastInGroup =
              index === messages.length - 1 ||
              messages[index + 1]?.sender !== msg.sender;

            return (
              <div
                key={msg._id || `msg-${index}`}
                className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 ${isLastInGroup ? "mb-4" : "mb-0.5"}`}
              >
                {/* Receiver Avatar: Only show on the last message of a group */}
                {!isMe && (
                  <div className="w-7 h-7 flex-shrink-0">
                    {isLastInGroup ? (
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                        {receiverInitial}
                      </div>
                    ) : (
                      <div className="w-7" />
                    )}
                  </div>
                )}

                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[70%]`}
                >
                  <div
                    className={`px-4 py-2.5 text-[14px] leading-relaxed shadow-sm
                    ${
                      isMe
                        ? "bg-blue-500 text-white rounded-[20px] rounded-br-[4px]"
                        : "bg-[#efefef] text-black rounded-[20px] rounded-bl-[4px]"
                    }
                    ${!isLastInGroup && isMe ? "rounded-br-[20px]" : ""}
                    ${!isLastInGroup && !isMe ? "rounded-bl-[20px]" : ""}
                  `}
                  >
                    {msg.mediaType === "image" && (
                      <img
                        src={msg.data}
                        className="rounded-lg mb-2 max-w-72 hover:opacity-90 transition-opacity cursor-pointer"
                        alt="Shared content"
                      />
                    )}
                    {msg.mediaType === "voice" && (
                      <audio
                        controls
                        src={msg.data}
                        className="w-48 h-8 brightness-95"
                      />
                    )}
                    {msg.text && (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>

                  {isLastInGroup && (
                    <span className="text-[10px] text-gray-400 mt-1 px-1 uppercase tracking-tighter">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Bar: Floating Pill Style */}
      <footer className="p-4 bg-white">
        <div className="max-w-4xl mx-auto flex items-center gap-2 border rounded-full px-4 py-1.5 focus-within:border-gray-400 transition-all shadow-sm">
          <input
            type="file"
            hidden
            ref={imageInputRef}
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleImageUpload(e.target.files[0])
            }
          />

          {!isRecording && (
            <button
              onClick={() => imageInputRef.current?.click()}
              className="p-1.5 hover:text-blue-500 transition-colors"
            >
              <ImageIcon className="w-6 h-6 text-gray-700" />
            </button>
          )}

          <button
            onClick={toggleRecording}
            className={`p-1.5 rounded-full ${isRecording ? "text-red-500 animate-pulse" : "text-gray-700 hover:text-red-500"}`}
          >
            {isRecording ? (
              <X className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {isRecording ? (
            <div className="flex-1 text-sm font-medium text-red-500 px-2">
              Recording audio...
            </div>
          ) : (
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                sendTypingStatus();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendText();
                }
              }}
              placeholder="Message..."
              className="flex-1 bg-transparent px-2 py-2 focus:outline-none resize-none text-[14px] max-h-32"
              rows={1}
            />
          )}

          <button
            onClick={handleSendText}
            disabled={!input.trim() && !isRecording}
            className="text-blue-500 font-semibold text-sm px-2 disabled:opacity-0 transition-opacity"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
