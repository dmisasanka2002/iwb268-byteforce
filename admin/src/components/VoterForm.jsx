import React, { useContext, useState } from "react";
import { addVoter } from "../services/electionService";
// import "../styles/VoterForm.css"; // Import CSS for advanced styling
import CsvUploader from "./CsvUploader";
import VoterList from "./VoterList";
import { ElectionContext } from "../contexts/ElectionContext";
import { useParams } from "react-router-dom";

const VoterForm = () => {
  const [name, setName] = useState("");
  const [voterNic, setVoterNic] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileType = "VOTERS"; // VOTERS

  // const { electionId } = useContext(ElectionContext);
  const { id: electionId } = useParams(); // Destructure and rename id to electionId
  console.log(electionId, "VoterForm");

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
      election_id: parseInt(electionId),
    });
    setName(""); // Clear form
    setVoterNic(""); // Clear form
    setVoterEmail("");
    setMessage("Voter added successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add Voter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block mb-1 font-semibold text-gray-700">
              Voter Name
            </label>
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
            <label className="block mb-1 font-semibold text-gray-700">
              Voter NIC
            </label>
            <input
              type="text"
              className={`form-input ${
                error && !voterNic ? "input-error" : ""
              }`}
              placeholder="Enter voter NIC"
              value={voterNic}
              onChange={(e) => setVoterNic(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-1 font-semibold text-gray-700">
              Voter Email
            </label>
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Voter
          </button>
          {message && (
            <p className="mt-2 font-medium text-center text-green-600">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-2 font-medium text-center text-red-600">{error}</p>
          )}
        </form>

        <div className="my-6 font-semibold text-center text-red-500">OR</div>

        {/* CSV Uploader */}
        <CsvUploader fileType={fileType} />

        {/* Voter List */}
        <VoterList electionId={electionId} />
      </div>
    </div>
  );
};

export default VoterForm;
