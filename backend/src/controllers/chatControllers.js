import { queryGemini } from "../config/geminiClient.js";
import { getRelevantContext } from "../utils/datasetRetrieval.js";
import { evaluateRisk } from "../utils/riskEvaluator.js";
import ChatLog from "../models/Chatlog.js";
import User from "../models/User.js";

export const chatWithBot = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { userId, message } = req.body;

    // Get user email from database
    let userEmail = null;
    if (userId && /^[0-9a-fA-F]{24}$/.test(userId)) {
      const user = await User.findById(userId).select("email");
      userEmail = user?.email;
    }

    const context = await getRelevantContext(message);
    const responseText = await queryGemini(message, context);
    const riskLevel = evaluateRisk(message); 
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;


    await ChatLog.create({
      userId,
      userEmail,
      userMessage: message,
      botResponse: responseText,
      riskLevel,
      responseTime
    });

    console.log(`💾 Chat saved | User: ${userEmail || userId} | Risk: ${riskLevel} | Response time: ${responseTime}ms`);

    res.json({
      message: responseText,
      riskLevel,
      flagged: riskLevel === "high",
      responseTime
    });
  } catch (err) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    console.error("❌ Chat error:", err.message);
    
    res.status(500).json({ 
      error: "Server error", 
      details: err.message,
      responseTime
    });
  }
};