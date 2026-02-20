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

    // 1. MUST match the logic used in POST: Sort the IDs
    const sortedParticipants = [senderId, receiverId].sort();

    // 2. Find the conversation using the exact sorted array
    const conversation = await Conversation.findOne({
      participants: sortedParticipants,
    }).lean();

    // If no conversation exists yet, just return an empty list
    if (!conversation) {
      return NextResponse.json({ success: true, messages: [] });
    }

    // 3. Fetch messages linked to this conversation
    const messages = await Message.findOne({
      conversationId: (conversation as any)._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    // 4. Format for Frontend (Matching your 'LiveMessage' type)
    const formatted = messages!.map((msg: any) => ({
      _id: msg._id.toString(),
      text: msg.content, // Frontend expects 'text'
      sender: msg.senderId === senderId ? "me" : "them", // Convert ID to "me"/"them"
      mediaType: msg.type !== "text" ? msg.type : undefined,
      data: msg.mediaUrl || null,
      filename: msg.filename || null,
      createdAt: msg.createdAt,
    }));

    console.log("Fetched Messages:", formatted);

    return NextResponse.json({ success: true, messages: formatted });
  } catch (err: any) {
    console.error("GET Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
