import React, { useState } from "react";
import { verifyVoter } from "../services/authService";
import "../styles/VoterLogin.css"; // Import custom styles

const VoterLogin = () => {
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(""); // For error handling

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    const response = await verifyVoter({ email, nic });
    if (response.success) {
      setIsVerified(true);
    } else {
      setError("Verification failed. Please check your email and NIC."); // Display error
    }
  };

  return (
    <div className="voter-login-container">
      <h1 className="login-title">Voter Login</h1>
      {!isVerified ? (
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC"
            required
            className="login-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      ) : (
        <p className="success-message">You are verified! You can now vote.</p>
      )}
    </div>
  );
};

export default VoterLogin;
