import User from "../models/User.js";
import ChatLog from "../models/Chatlog.js";

export const getAdminStats = async (req, res) => {
  try {
    console.log("\n📊 Fetching admin statistics...");

    // Get today's date range (midnight to now)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log(`📅 Date range: ${today.toISOString()} to ${tomorrow.toISOString()}`);

    // 1️⃣ Number of users registered today
    const userCount = await User.countDocuments({ 
      createdAt: { $gte: today, $lt: tomorrow } 
    });
    console.log(`👥 Users registered today: ${userCount}`);

    // 2️⃣ Total number of chats in database
    const totalChats = await ChatLog.countDocuments();
    console.log(`💬 Total chats in DB: ${totalChats}`);

    // 3️⃣ Average chatbot response time
    const avgResponse = await ChatLog.aggregate([
      { 
        $match: { 
          responseTime: { $exists: true, $ne: null } 
        } 
      },
      { 
        $group: { 
          _id: null, 
          avgResponseTime: { $avg: "$responseTime" } 
        } 
      }
    ]);
    const avgResponseTime = avgResponse[0]?.avgResponseTime || 0;
    console.log(`⚡ Average response time: ${avgResponseTime.toFixed(0)}ms`);

    // 4️⃣ High-risk users list (TODAY ONLY) - ✅ Now using userEmail from ChatLog
    const highRiskChats = await ChatLog.find({ 
      riskLevel: { $in: ["high", "High"] },
      createdAt: { $gte: today, $lt: tomorrow } // ✅ Filter for today only
    })
      .sort({ createdAt: -1 })
      .select("userEmail userId createdAt userMessage")
      .limit(20);

    console.log(`⚠️  High-risk chats found today: ${highRiskChats.length}`);

    // ✅ Group by email to avoid duplicates and get the latest message for each user
    const uniqueHighRiskUsers = {};
    
    for (const chat of highRiskChats) {
      const email = chat.userEmail || `Anonymous (${chat.userId})`;
      
      if (!uniqueHighRiskUsers[email]) {
        // Try to find username from User collection
        let username = null;
        if (chat.userEmail) {
          const userDoc = await User.findOne({ email: chat.userEmail }).select("username");
          username = userDoc?.username;
        }
        
        uniqueHighRiskUsers[email] = {
          email: chat.userEmail || email,
          username: username || "N/A",
          userId: chat.userId,
          lastRiskMessage: chat.userMessage?.substring(0, 100) || "No message",
          timestamp: chat.createdAt,
          riskLevel: chat.riskLevel
        };
      }
    }

    const finalHighRiskList = Object.values(uniqueHighRiskUsers).slice(0, 10);

    console.log(`🚨 Unique high-risk users to display: ${finalHighRiskList.length}`);

    // 5️⃣ Additional useful stats
    const chatsToday = await ChatLog.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const totalUsers = await User.countDocuments();

    // Risk level breakdown
    const riskBreakdown = await ChatLog.aggregate([
      {
        $group: {
          _id: "$riskLevel",
          count: { $sum: 1 }
        }
      }
    ]);

    console.log("✅ Stats fetched successfully\n");

    res.status(200).json({
      success: true,
      userCount,
      totalChats,
      avgResponseTime: Math.round(avgResponseTime),
      highRiskUsers: finalHighRiskList,
      // Additional stats
      chatsToday,
      totalUsers,
      riskBreakdown: {
        low: riskBreakdown.find(r => r._id === "low" || r._id === "Low")?.count || 0,
        moderate: riskBreakdown.find(r => r._id === "moderate" || r._id === "Moderate")?.count || 0,
        high: riskBreakdown.find(r => r._id === "high" || r._id === "High")?.count || 0
      }
    });

  } catch (error) {
    console.error("❌ Error fetching admin stats:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch admin stats",
      error: error.message 
    });
  }
};