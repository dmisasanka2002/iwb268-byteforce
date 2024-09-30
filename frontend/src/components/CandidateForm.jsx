import React, { useState } from "react";
import { addCandidate } from "../services/electionService";
import "../styles/CandidateForm.css"; // Import CSS for advanced styling

const CandidateForm = ({ electionId }) => {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !party) {
      setError("All fields are required.");
      return;
    }
    setError("");
    await addCandidate({ name, party, electionId });
    setName(""); // Clear form
    setParty(""); // Clear form
    setMessage("Candidate added successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Candidate</h2>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label>Candidate Name</label>
          <input
            type="text"
            className={`form-input ${error && !name ? "input-error" : ""}`}
            placeholder="Enter candidate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Party</label>
          <input
            type="text"
            className={`form-input ${error && !party ? "input-error" : ""}`}
            placeholder="Enter party name"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Candidate
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CandidateForm;
