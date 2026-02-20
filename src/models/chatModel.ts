import mongoose from "mongoose";

// DELETE EVERYTHING ELSE. Just these lines.
const MessageSchema = new mongoose.Schema({
  convoId: mongoose.Schema.Types.ObjectId,
  senderId: String,
  receiverId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema({
  participants: [String],
  lastMessage: String,
  updatedAt: Date,
});

export const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);
