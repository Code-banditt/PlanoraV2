import connectDB from "@/libs/mongodb";
import Conversation from "@/models/convoModel";
import Message from "@/models/messageModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    if (!senderId || !receiverId) {
      return NextResponse.json(
        { success: false, error: "Missing IDs" },
        { status: 400 },
      );
    }

    // 1. Match logic: Sort the IDs
    const sortedParticipants = [senderId, receiverId].sort();

    // 2. Find the conversation
    const conversation = await Conversation.findOne({
      participants: sortedParticipants,
    }).lean();

    // If no conversation exists yet, return an empty list safely
    if (!conversation) {
      return NextResponse.json({ success: true, messages: [] });
    }

    // 3. FIX: Changed findOne to find to get an ARRAY of messages
    const messages = await Message.find({
      conversationId: (conversation as any)._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    // 4. Format for Frontend (Safely check if messages is an array)
    const formatted = (messages || []).map((msg: any) => ({
      _id: msg._id.toString(),
      text: msg.content,
      sender: msg.senderId === senderId ? "me" : "them",
      mediaType: msg.type !== "text" ? msg.type : undefined,
      data: msg.mediaUrl || null,
      filename: msg.filename || null,
      createdAt: msg.createdAt,
    }));

    return NextResponse.json({ success: true, messages: formatted });
  } catch (err: any) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
