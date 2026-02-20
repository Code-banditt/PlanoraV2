import connectDB from "@/libs/mongodb";
import Conversation from "@/models/convoModel";
import Message from "@/models/messageModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { senderId, receiverId, content, type, mediaUrl, filename } =
      await req.json();

    const sortedParticipants = [senderId, receiverId].sort();

    // Determine what to show in the sidebar "last message" preview
    let previewText = content;
    if (type === "image") previewText = "📷 Image";
    if (type === "voice") previewText = "🎤 Voice message";

    // 1. Update or Create Conversation
    const conversation = await Conversation.findOneAndUpdate(
      { participants: sortedParticipants },
      {
        $set: {
          lastMessageText: previewText, // Use the preview text here
          lastMessageAt: new Date(),
        },
        $setOnInsert: { participants: sortedParticipants },
      },
      {
        upsert: true,
        new: true,
      },
    );

    if (!conversation) throw new Error("Conversation creation failed");

    // 2. Create the message with Media fields
    const messageDoc = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content: content || "",
      type: type || "text",
      mediaUrl, // Added this
      filename, // Added this
    });

    return NextResponse.json({
      success: true,
      message: {
        _id: messageDoc._id.toString(),
        content: messageDoc.content,
        senderId: messageDoc.senderId.toString(),
        type: messageDoc.type,
        mediaUrl: messageDoc.mediaUrl,
        filename: messageDoc.filename,
        createdAt: messageDoc.createdAt,
      },
    });
  } catch (err: any) {
    console.error("POST Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
