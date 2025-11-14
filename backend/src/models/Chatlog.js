import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true }, // ✅ Added email field
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  riskLevel: { type: String, enum: ["low", "moderate", "high", "Low", "Moderate", "High"], default: "low" },
  responseTime: { type: Number }, // Response time in milliseconds
}, { timestamps: true });

const ChatLog = mongoose.model("ChatLog", chatSchema);
export default ChatLog;