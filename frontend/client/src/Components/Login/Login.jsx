import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import personIcon from "../../assets/person.svg";
import keyIcon from "../../assets/key.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false); // animation trigger
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true); // triggers fade-up animation only once
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");

        if (res.data.user.role === "pcs_staff") {
          navigate("/admin");
        } else {
          navigate("/main");
        }
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed! Check your server or credentials.");
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
          <h3>USER LOGIN</h3>
          <form onSubmit={handleLogin}>
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
              <img src={keyIcon} alt="Key Icon" className="input-icon" />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="linksToPage">
              <Link className="f" to="/Forget">Forget Password</Link>
              <Link  className = "r"to="/register">Register an account</Link>
            </div>

            <button className="LoginBtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
