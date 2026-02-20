import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  _id: mongoose.Types.ObjectId;
  participants: string[];
  lastMessageText: string;
  lastMessageAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  _v: number;
}

const conversationSchema = new Schema<IConversation>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    participants: {
      type: [String], // Using String to match your session IDs
      required: true,
      index: true,
    },

    lastMessageText: {
      type: String,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    // This ensures that even if you forget .lean(),
    // the JSON version of this doc is cleaner
    toJSON: {
      virtuals: true,
    },
  },
);

// Compound index to make finding chats between two specific people instant
conversationSchema.index({ participants: 1 });

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
