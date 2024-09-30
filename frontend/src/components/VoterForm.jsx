import React, { useState } from "react";
import { addVoter } from "../services/electionService";
import "../styles/VoterForm.css"; // Import CSS for advanced styling

const VoterForm = () => {
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !voterId) {
      setError("All fields are required.");
      return;
    }
    setError("");
    await addVoter({ name, voterId });
    setName(""); // Clear form
    setVoterId(""); // Clear form
    setMessage("Voter added successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Voter</h2>
      <form onSubmit={handleSubmit} className="voter-form">
        <div className="form-group">
          <label>Voter Name</label>
          <input
            type="text"
            className={`form-input ${error && !name ? "input-error" : ""}`}
            placeholder="Enter voter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Voter ID</label>
          <input
            type="text"
            className={`form-input ${error && !voterId ? "input-error" : ""}`}
            placeholder="Enter voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Voter
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default VoterForm;
