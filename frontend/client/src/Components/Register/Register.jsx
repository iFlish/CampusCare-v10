import { useState } from "react";
import axios from "axios";
import "./Register.css";
import personIcon from "../../assets/person.svg";
import keyIcon from "../../assets/key.svg";
import emailIcon from "../../assets/email.svg";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // state variables for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!username || !email || !password || !role) {
      alert("⚠️ Please fill in all fields before registering.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        username,
        email,
        password,
        role,
      });

      if (response.data.success) {
        alert("✅ Registration successful! You can now log in.");
        // optional: redirect to login page after registration
        window.location.href = "/";
      } else {
        alert(`⚠️ ${response.data.message || "Registration failed."}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("❌ Registration failed. Please check the server connection.");
    }
  };

  return (
    <div className="RegisterPage">
      {/* Right side - registration form */}
      <div className="right-side">
        <div className="login-components">
          <form onSubmit={handleRegister}>
            <h3>USER REGISTRATION</h3>

            <div className="input-box">
              <img src={personIcon} alt="User Icon" className="input-icon" />
              <input
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <img src={emailIcon} alt="Email Icon" className="input-icon" />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <img src={keyIcon} alt="Key Icon" className="input-icon" />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="role-selection">
              <p>Select your role:</p>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="pcs_staff"
                  checked={role === "pcs_staff"}
                  onChange={(e) => setRole(e.target.value)}
                />
                PCS Staff
              </label>
            </div>

            <div className="linksToPage">
               <Link className="f" to="/Forget">Forget Password</Link>
               <Link  className = "r"to="/Login">Already Registered? Login</Link>
            </div>

            <button className="LoginBtn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Left side - welcome bubbles and text */}
      <div className="left-side">
        <div className="bubbles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bubble"></div>
          ))}
        </div>
        <div className="mainText">
          <div className="main">
            <p className="welcome">Welcome to</p>
            <p className="name">CampusCare</p>
          </div>
          <div className="supplementary">
            Empowering students to take control of their well-being and academic journey.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
