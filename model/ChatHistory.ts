import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  messages: { type: Array, default: [] },
});

const ChatHistory = mongoose.models.ChatHistory || mongoose.model("ChatHistory", ChatSchema);
export default ChatHistory;
