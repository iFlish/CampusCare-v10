import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

function AdminPage() {
  const [stats, setStats] = useState({
    userCount: 0,
    totalChats: 0,
    avgResponseTime: 0,
    highRiskUsers: [],
    chatsToday: 0,
    totalUsers: 0,
    riskBreakdown: { low: 0, moderate: 0, high: 0 }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admin stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("📊 Fetching admin stats...");
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        console.log("✅ Stats received:", res.data);
        console.log("🚨 High-risk users count:", res.data.highRiskUsers?.length);
        setStats(res.data);
        setError(null);
      } catch (error) {
        console.error("❌ Failed to fetch admin stats:", error);
        setError(error.response?.data?.message || "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format timestamp to readable format
  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav>
        <ul>
          <li className="logo">
            <img
              src="https://i.postimg.cc/WzkCM20g/logo1.png"
              alt="CampusCare Logo"
            />
          </li>
          <li>
            <a href="/">
              <i className="fa fa-home"></i> Home
            </a>
          </li>
          <li>
            <a
              href="https://www.utp.edu.my/Pages/PCS.aspx"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-university"></i> Visit UTP PCS
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-heartbeat"></i> Mental Health
            </a>
          </li>
        </ul>
      </nav>

      {/* ===== INFO SECTION ===== */}
      <div className="info-section">
        {loading ? (
          <div className="empty-state">
            <h2>Loading Admin Dashboard...</h2>
            <p>Fetching statistics from database...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h2>⚠️ Error Loading Data</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#6d187c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="upper-info">
              <div className="NumberOfUsers">
                <h3>👥 Users Registered Today</h3>
                <p style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', margin: '10px 0' }}>
                  {stats.userCount}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Total users: {stats.totalUsers}
                </p>
              </div>

              <div className="avgResponseTime">
                <h3>⚡ Avg Response Time</h3>
                <p style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', margin: '10px 0' }}>
                  {stats.avgResponseTime}
                  <span style={{ fontSize: '24px' }}>ms</span>
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Based on all chats
                </p>
              </div>

              <div className="totalChatNumber">
                <h3>💬 Total Chats</h3>
                <p style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', margin: '10px 0' }}>
                  {stats.totalChats}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Today: {stats.chatsToday}
                </p>
              </div>
            </div>

            {/* Risk Level Breakdown */}
            <div className="lower-info">
              <h3>📊 Risk Level Distribution</h3>
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ 
                  flex: 1, 
                  background: 'rgba(76, 175, 80, 0.2)', 
                  padding: '15px', 
                  borderRadius: '10px',
                  borderLeft: '4px solid #4CAF50'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Low Risk</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                    {stats.riskBreakdown?.low || 0}
                  </p>
                </div>
                <div style={{ 
                  flex: 1, 
                  background: 'rgba(255, 193, 7, 0.2)', 
                  padding: '15px', 
                  borderRadius: '10px',
                  borderLeft: '4px solid #FFC107'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Moderate Risk</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                    {stats.riskBreakdown?.moderate || 0}
                  </p>
                </div>
                <div style={{ 
                  flex: 1, 
                  background: 'rgba(244, 67, 54, 0.2)', 
                  padding: '15px', 
                  borderRadius: '10px',
                  borderLeft: '4px solid #F44336'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>High Risk</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                    {stats.riskBreakdown?.high || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* High Risk Users List - TODAY ONLY */}
            <div className="lower-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>🚨 High Risk Users (Today)</h3>
                <span style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(244, 67, 54, 0.2)',
                  padding: '5px 12px',
                  borderRadius: '15px'
                }}>
                  {stats.highRiskUsers?.length || 0} user{stats.highRiskUsers?.length !== 1 ? 's' : ''} flagged
                </span>
              </div>
              
              {!stats.highRiskUsers || stats.highRiskUsers.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '10px'
                }}>
                  <p style={{ 
                    fontSize: '24px',
                    margin: '0 0 10px 0',
                    color: 'white'
                  }}>
                    ✅
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    color: 'rgba(255,255,255,0.9)',
                    margin: 0
                  }}>
                    No high-risk users detected today
                  </p>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255,255,255,0.6)',
                    margin: '5px 0 0 0'
                  }}>
                    All users are within safe parameters
                  </p>
                </div>
              ) : (
                <div style={{ 
                  marginTop: '15px', 
                  maxHeight: '500px', 
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  {stats.highRiskUsers.map((user, i) => (
                    <div 
                      key={`${user.userId}-${i}`}
                      style={{
                        background: 'rgba(244, 67, 54, 0.15)',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '12px',
                        borderLeft: '5px solid #F44336',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(244, 67, 54, 0.25)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(244, 67, 54, 0.15)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* User Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ 
                            margin: 0, 
                            fontSize: '18px', 
                            fontWeight: 'bold',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span style={{ 
                              background: '#F44336',
                              color: 'white',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {i + 1}
                            </span>
                            {user.email || user.username || 'Unknown User'}
                          </p>
                          {user.username && user.email && (
                            <p style={{ 
                              margin: '5px 0 0 32px', 
                              fontSize: '14px',
                              color: 'rgba(255,255,255,0.7)'
                            }}>
                              Username: {user.username}
                            </p>
                          )}
                        </div>
                        {user.timestamp && (
                          <span style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.6)',
                            whiteSpace: 'nowrap',
                            marginLeft: '10px'
                          }}>
                            🕐 {formatTime(user.timestamp)}
                          </span>
                        )}
                      </div>

                      {/* Risk Message */}
                      {user.lastRiskMessage && (
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '12px',
                          borderRadius: '8px',
                          marginTop: '10px'
                        }}>
                          <p style={{ 
                            margin: '0 0 5px 0', 
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.5)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            ⚠️ Flagged Message
                          </p>
                          <p style={{ 
                            margin: 0, 
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.9)',
                            fontStyle: 'italic',
                            lineHeight: '1.5'
                          }}>
                            "{user.lastRiskMessage}"
                          </p>
                        </div>
                      )}

                      {/* Additional Info */}
                      {user.riskLevel && (
                        <div style={{ marginTop: '10px' }}>
                          <span style={{
                            display: 'inline-block',
                            background: '#F44336',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            Risk Level: {user.riskLevel.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ===== BACKGROUND BUBBLES ===== */}
      <div className="bubbles">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
    </>
  );
}

export default AdminPage;