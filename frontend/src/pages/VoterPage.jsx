import React from "react";
import VoterLogin from "../components/VoterLogin";
import "../styles/VoterPage.css"; // Custom CSS for styling

const VoterPage = () => {
  return (
    <div className="voter-page-container">
      <h1 className="voter-page-title">Voter Login</h1>
      <div className="voter-login-section">
        <VoterLogin />
      </div>
    </div>
  );
};

export default VoterPage;
