"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import base64url from "base64url";
import { Search, MoreVertical, MessageSquare, X, UserPlus } from "lucide-react";
import { useConversations } from "@/app/reactQueryCalls/useConversations";
import { useSocket } from "@/libs/socketContext";
import { useUser } from "@/app/reactQueryCalls/useUser";

export default function WhatsAppLayout() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const params = useParams();
  const socket = useSocket();

  const { data: currentUserData } = useUser(userId);
  const { data: conversations = [], refetch } = useConversations(userId);

  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatInput, setNewChatInput] = useState("");

  const isChatOpen = !!params.receiverId;

  // Socket logic for online status
  useEffect(() => {
    if (!socket || !userId) return;
    socket.emit("register", userId);
    socket.on("user_online", ({ userId }) =>
      setOnlineUsers((prev) => new Set(prev).add(userId)),
    );
    socket.on("user_offline", ({ userId }) =>
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(userId);
        return updated;
      }),
    );
    return () => {
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, [socket, userId]);

  const handleOpenChat = (receiverId: string) => {
    setIsModalOpen(false);
    const encoded = base64url.encode(receiverId);
    router.push(`/chat/${encoded}`);
  };

  if (!userId)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-gray-900">
      {/* --- NEW CHAT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-[#00a884] text-white">
              <h2 className="font-semibold">New Chat</h2>
              <X
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="p-4">
              <input
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#00a884]"
                placeholder="Enter User ID or Username..."
                value={newChatInput}
                onChange={(e) => setNewChatInput(e.target.value)}
              />
              <button
                onClick={() => handleOpenChat(newChatInput)}
                className="w-full mt-4 bg-[#00a884] text-white py-3 rounded-lg font-bold hover:bg-[#008f72] transition-colors"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`${isChatOpen ? "hidden md:flex" : "flex"} flex-col w-full md:w-[350px] lg:w-[400px] bg-white border-r border-gray-300`}
      >
        <div className="bg-[#f0f2f5] px-4 py-[10px] flex justify-between items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {currentUserData?.username?.charAt(0) || "U"}
          </div>
          <div className="flex gap-5 text-gray-600">
            <MessageSquare
              className="w-5 h-5 cursor-pointer hover:text-[#00a884]"
              onClick={() => setIsModalOpen(true)}
            />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        <div className="p-2 bg-white">
          <div className="bg-[#f0f2f5] flex items-center px-3 py-1.5 rounded-lg">
            <Search className="w-4 h-4 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent text-sm w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv: any) => (
            <div
              key={conv.id}
              onClick={() => handleOpenChat(conv.otherParticipantId)}
              className={`flex items-center px-3 py-3 cursor-pointer border-b border-gray-50 transition-all ${params.receiverId === base64url.encode(conv.otherParticipantId) ? "bg-[#f0f2f5]" : "hover:bg-[#f5f6f6]"}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {conv.receiverName?.charAt(0).toUpperCase()}
                </div>
                {onlineUsers.has(conv.otherParticipantId) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">
                    {conv.receiverName}
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {new Date(conv.lastMessageAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage?.text || "No messages"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main
        className={`${!isChatOpen ? "hidden md:flex" : "flex"} flex-1 flex-col bg-[#efeae2] relative`}
      >
        {!isChatOpen ? (
          <div className="flex flex-col items-center justify-center h-full bg-[#f8f9fa] border-b-[6px] border-[#00a884]">
            <div
              className="w-72 h-72 opacity-20 mb-8"
              style={{
                backgroundImage:
                  'url("https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669ae5z6q.png")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
            <h1 className="text-3xl font-light text-gray-700">Planora Web</h1>
            <p className="text-gray-500 mt-3 text-sm text-center">
              Select a chat to start messaging.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full bg-white">
            {/* The child component/route will render here */}
            <div className="m-auto text-gray-400">Loading Chat...</div>
          </div>
        )}
      </main>
    </div>
  );
}
