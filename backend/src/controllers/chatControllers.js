import { queryGemini } from "../config/geminiClient.js";
import { getRelevantContext } from "../utils/datasetRetrieval.js";
import { evaluateRisk } from "../utils/riskEvaluator.js";
import ChatLog from "../models/Chatlog.js";

export const chatWithBot = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { userId, userEmail, message } = req.body; // ✅ Extract userEmail

    // ✅ Validate required fields
    if (!userEmail) {
      return res.status(400).json({ 
        error: "User email is required",
        details: "Please log in again to continue chatting"
      });
    }

    const context = await getRelevantContext(message);
    const responseText = await queryGemini(message, context);
    const riskLevel = evaluateRisk(message); // ✅ Evaluate risk from USER message, not bot response
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // ✅ Save chat with user email
    await ChatLog.create({
      userId,
      userEmail, // ✅ Save email
      userMessage: message,
      botResponse: responseText,
      riskLevel,
      responseTime
    });

    console.log(`💾 Chat saved | User: ${userEmail} | Risk: ${riskLevel} | Response time: ${responseTime}ms`);

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