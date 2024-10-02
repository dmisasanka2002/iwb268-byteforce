import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import "../styles/AdminLogin.css"; // Import CSS for styling

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    // Simulate admin login (replace with real login logic)
    if (email === "admin@example.com" && password === "admin123") {
      // Redirect to dashboard after successful login
      navigate("/admin-dashboard"); // Use navigate instead of history.push
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
