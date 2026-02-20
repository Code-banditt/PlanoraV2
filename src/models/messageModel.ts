import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  senderId: string;
  receiverId: string;
  content: string;
  type: "text" | "image" | "voice";
  mediaUrl?: string;
  filename?: string;
  createdAt: Date;
  _v: number;
}

const messageSchema = new Schema<IMessage>(
  {
    id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: {
      type: String,
      required: function () {
        return this.type !== "voice";
      },
    },

    type: { type: String, enum: ["text", "image", "voice"], default: "text" },
    mediaUrl: { type: String },
    filename: { type: String },
  },
  { timestamps: true },
);

// Indexing conversationId is vital for the GET /api/messages/get route
messageSchema.index({ conversationId: 1, createdAt: 1 });

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);
export default Message;
