import React, { useState } from "react";
import { addCandidate } from "../services/electionService";
import CandidateList from "./CandidatesList";
import CsvUploader from "./CsvUploader";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [number, setnumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileType = "CANDIDATES"; // CANDIDATES
  const fileType = "CANDIDATES"; // CANDIDATES

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
    if (res.isSuccess) {
      setName(""); // Clear form
      setnumber(""); // Clear form
      setMessage("Candidate added successfully!");
      toast.success("Candidate added successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
    } else {
      setError(res.message);
      toast.error("Unique index or primary key violation");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add Candidate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block mb-1 font-semibold text-gray-700">
              Candidate Number
            </label>
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
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              className={`form-input ${error && !number ? "input-error" : ""}`}
              placeholder="Enter candidate name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Candidate
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

        <div className="my-6 font-semibold text-center text-gray-700">OR</div>

        {/* CSV Uploader */}
        <CsvUploader fileType={fileType} />

        {/* Candidate List */}
        <CandidateList electionId={id} />
      </div>
    </div>
  );
};

export default CandidateForm;
