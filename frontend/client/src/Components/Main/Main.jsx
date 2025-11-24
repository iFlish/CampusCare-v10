import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Main.css";
import upArrow from "../../assets/upparrow.svg";
import logo from '../../assets/logo.png';

function Main() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); 
  const chatEndRef = useRef(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;


    if (!user || !user.email) {
      alert("Please log in to use the chatbot");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        userId: user._id || user.username, 
        userEmail: user.email, 
        message: currentInput,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.message || res.data.reply,
        riskLevel: res.data.riskLevel,
        isHtml: true,
      };

      setMessages((prev) => [...prev, botMessage]);

  
      if (res.data.flagged) {
        console.warn("High risk conversation detected");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

      <nav>
        <ul>
          <li className="logo">
            <img src={logo} alt="CampusCare Logo" />
          </li>

          <li>
            <Link to="/main">
              <i className="fa fa-user-md" style={{ marginRight: '10px' }}></i>
              ChatBot
            </Link>
          </li>

          <li>
            <Link to="/PCS">
              <i className="fa fa-university"></i> UTP PCS
            </Link>
          </li>

          <li>
            <Link to="/mentalhealth">
              <i className="fa fa-heartbeat"></i> Mental Health Info
            </Link>
          </li>

          <li className="logout">
            <Link to="/">
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>


      <div className="bubbles">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

  
      <div className="chat-section">
        <div className="chat-box">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>Welcome to CampusCare{user ? `, ${user.username}` : ''}</h2>
              <p>
                I'm here to support your mental health journey. Feel free to
                share what's on your mind.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === "user" ? "user-msg" : "bot-msg"
                  }`}
                >
                  {msg.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="message bot-msg">
                  <em>Typing...</em>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="enter-input-section" onSubmit={handleSend}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Ask me anything about mental health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button className="submit" type="submit" disabled={isLoading}>
              <img src={upArrow} alt="Send" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Main;