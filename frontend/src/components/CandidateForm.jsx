import React, { useState } from "react";
import { addCandidate } from "../services/electionService";
import "../styles/CandidateForm.css"; // Import CSS for advanced styling
import CandidateList from "./CandidatesList";
import CsvUploader from "./CsvUploader";
import { useParams } from "react-router-dom";

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [number, setnumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !number) {
      setError("All fields are required.");
      return;
    }
    setError("");
    const res = await addCandidate({
      name,
      number: parseInt(number),
      election_id: parseInt(id),
    });
    console.log(res);

    setName(""); // Clear form
    setnumber(""); // Clear form
    setMessage("Candidate added successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Candidate</h2>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label>Candidate Number</label>
          <input
            type="number"
            className={`form-input ${error && !name ? "input-error" : ""}`}
            placeholder="Enter candidate number"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className={`form-input ${error && !number ? "input-error" : ""}`}
            placeholder="Enter candidate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Candidate
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      <CsvUploader />
      <CandidateList />
    </div>
  );
};

export default CandidateForm;
