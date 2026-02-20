import connectDB from "@/libs/mongodb";
import Conversation from "@/models/convoModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ success: false }, { status: 400 });

    const conversations = await Conversation.find({ participants: userId })
      .sort({ lastMessageAt: -1 })
      .lean();

    // Promise.all to fetch all usernames in parallel
    const formatted = await Promise.all(
      conversations.map(async (conv: any) => {
        const otherId = conv.participants.find((p: string) => p !== userId);

        // other user's actual username from the User collection
        const otherUser = await User.findById(otherId)
          .select("username name image")
          .lean();

        return {
          id: conv._id.toString(),
          otherParticipantId: otherId,
          //  fetched username, fallback to a slice of ID if not found
          receiverName:
            otherUser?.username ||
            otherUser?.name ||
            `User ${otherId.slice(-4)}`,
          receiverImage: otherUser?.image || null,
          lastMessage: conv.lastMessageText
            ? {
                text: conv.lastMessageText,
                createdAt: conv.lastMessageAt,
                type: "text",
              }
            : null,
          lastMessageAt: conv.lastMessageAt,
        };
      }),
    );

    return NextResponse.json({ success: true, conversations: formatted });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
