import React, { useContext, useState } from "react";
import { addVoter } from "../services/electionService";
import "../styles/VoterForm.css"; // Import CSS for advanced styling
import CsvUploader from "./CsvUploader";
import VoterList from "./VoterList";
import { ElectionContext } from "../contexts/ElectionContext";

const VoterForm = () => {
  const [name, setName] = useState("");
  const [voterNic, setVoterNic] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileType = "TEST"; // VOTERS

  const { electionId } = useContext(ElectionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !voterNic) {
      setError("All fields are required.");
      return;
    }
    setError("");
    await addVoter({
      name,
      nic: voterNic,
      email: voterEmail,
      election_id: electionId,
    });
    setName(""); // Clear form
    setVoterNic(""); // Clear form
    setVoterEmail("");
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
          <label>Voter NIC</label>
          <input
            type="text"
            className={`form-input ${error && !voterNic ? "input-error" : ""}`}
            placeholder="Enter voter NIC"
            value={voterNic}
            onChange={(e) => setVoterNic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Voter Email</label>
          <input
            type="email"
            className={`form-input ${
              error && !voterEmail ? "input-error" : ""
            }`}
            placeholder="Enter voter Email"
            value={voterEmail}
            onChange={(e) => setVoterEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Voter
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      <h2>OR</h2>
      <CsvUploader fileType={fileType} />
      <VoterList />
    </div>
  );
};

export default VoterForm;
