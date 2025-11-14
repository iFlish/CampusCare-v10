import mongoose from "mongoose";

const HighRiskUserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    lastRiskMessage: { type: String, required: true },
    riskLevel: { type: String, default: "high" },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("HighRiskUser", HighRiskUserSchema);
