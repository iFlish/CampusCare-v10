import { useState, useEffect } from "react";
import "./ForgetPassword.css";
import { useNavigate, Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successful! You can now login with your new password.");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Password reset failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server!");
    }
  };

  return (
    <div className="LoginPage">
      <div className="left-side">
        <div className="bubbles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bubble"></div>
          ))}
        </div>

        <div className="mainText">
          <div className="main">
            <p className={`welcome ${animate ? "animate" : ""}`}>Welcome to</p>
            <p className={`name ${animate ? "animate" : ""}`}>CampusCare</p>
          </div>
          <div className={`supplementary ${animate ? "animate" : ""}`}>
            Empowering students to take control of their well-being and academic journey.
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="login-components">
          <h3>RESET PASSWORD</h3>
          <div className="input-box1">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box2">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-box3">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="linksToPage">
            <a onClick={() => window.history.back()}>Back to Login</a>
          </div>

          <button className="ResetBtn" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
