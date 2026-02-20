import connectDB from "@/libs/mongodb";
import Conversation from "@/models/convoModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const user1 = searchParams.get("user1");
    const user2 = searchParams.get("user2");

    if (!user1 || !user2)
      return NextResponse.json(
        { success: false, error: "Missing user IDs" },
        { status: 400 },
      );

    const participants = [user1, user2].sort();

    let conversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants,
        lastMessage: null,
        lastMessageText: "",
        lastMessageAt: null,
        unreadCount: new Map([
          [user1, 0],
          [user2, 0],
        ]),
      });
    }

    return NextResponse.json({
      success: true,
      conversationId: conversation._id.toString(),
      participants: conversation.participants,
      exists: !!conversation,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
