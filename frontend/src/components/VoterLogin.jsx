import React, { useState } from "react";
import { verifyVoter } from "../services/authService";
import "../styles/VoterLogin.css"; // Import custom styles
import { Link } from "react-router-dom";

const VoterLogin = () => {
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(""); // For error handling

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (email == "test@gmail.com" && nic == "12345678") {
      setIsVerified(true);
    } else {
      setError("Verification failed. Please check your email and NIC."); // Display error
    }
    // const response = await verifyVoter({ email, nic });
    // if (response.success) {
    //   setIsVerified(true);
    // } else {
    //   setError("Verification failed. Please check your email and NIC."); // Display error
    // }

    if (isVerified) {
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
        <div className="success">
          <p className="success-message">You are verified! You can now vote.</p>
          <Link to="/voter/vote">Click To Vote</Link>
        </div>
      )}
    </div>
  );
};

export default VoterLogin;
