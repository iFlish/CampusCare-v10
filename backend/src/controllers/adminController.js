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

    // 4️⃣ High-risk users list - TODAY ONLY with aggregation pipeline
    const highRiskChatsToday = await ChatLog.aggregate([
      {
        $match: {
          riskLevel: { $in: ["high", "High"] },
          createdAt: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$userId",
          lastRiskMessage: { $first: "$userMessage" },
          timestamp: { $first: "$createdAt" },
          userEmail: { $first: "$userEmail" }
        }
      },
      {
        $limit: 10
      }
    ]);

    console.log(`⚠️  High-risk chats found TODAY: ${highRiskChatsToday.length}`);

    // Extract user IDs and map to users
    const userIds = highRiskChatsToday.map(chat => chat._id).filter(id => 
      /^[0-9a-fA-F]{24}$/.test(id) // Valid MongoDB ObjectID
    );

    let highRiskUserList = [];

    if (userIds.length > 0) {
      // Get user details
      const users = await User.find({
        _id: { $in: userIds }
      }).select("email username _id");

      // Create a map for quick lookup
      const userMap = {};
      users.forEach(user => {
        userMap[user._id.toString()] = {
          email: user.email,
          username: user.username
        };
      });

      // Build the final list with user details
      highRiskUserList = highRiskChatsToday.map(chat => {
        const userId = chat._id.toString();
        const userInfo = userMap[userId];

        return {
          userId: userId,
          email: chat.userEmail || userInfo?.email || `Unknown User (${userId})`,
          username: userInfo?.username || "Unknown",
          lastRiskMessage: chat.lastRiskMessage,
          timestamp: chat.timestamp,
          riskLevel: "high"
        };
      });
    } else {
      // Handle non-ObjectID userIds
      highRiskUserList = highRiskChatsToday.map(chat => ({
        userId: chat._id,
        email: chat.userEmail || `Anonymous User (${chat._id})`,
        username: "Unknown",
        lastRiskMessage: chat.lastRiskMessage,
        timestamp: chat.timestamp,
        riskLevel: "high"
      }));
    }

    console.log(`🚨 High-risk users to display: ${highRiskUserList.length}`);

    // 5️⃣ Additional stats
    const chatsToday = await ChatLog.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const totalUsers = await User.countDocuments();

    // Risk level breakdown - ALL TIME
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
      highRiskUsers: highRiskUserList,
      chatsToday,
      totalUsers,
      riskBreakdown: {
        low: riskBreakdown.find(r => r._id === "low")?.count || 0,
        moderate: riskBreakdown.find(r => r._id === "moderate")?.count || 0,
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