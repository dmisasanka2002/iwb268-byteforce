import React, { useContext, useState } from "react";
import { addVoter } from "../services/electionService";
// import "../styles/VoterForm.css"; // Import CSS for advanced styling
import CsvUploader from "./CsvUploader";
import VoterList from "./VoterList";
import { ElectionContext } from "../contexts/ElectionContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

/**
 * A React component that renders a form to add a voter to an election.
 * The form takes in the voter name, NIC and email and calls the addVoter
 * function to add the voter to the election. The component also displays
 * a success message if the voter is added successfully and an error message
 * if the voter fails to be added.
 *
 * The component also includes a CSV uploader to add voters in bulk.
 *
 * @returns {React.ReactElement} - A React component that renders a form to add a voter.
 */
const VoterForm = () => {
  const [name, setName] = useState("");
  const [voterNic, setVoterNic] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileType = "VOTERS"; // VOTERS

  const { id: electionId } = useParams(); // Destructure and rename id to electionId

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !voterNic) {
      setError("All fields are required.");
      return;
    }
    setError("");
    const res = await addVoter({
      name,
      nic: voterNic,
      email: voterEmail,
      election_id: parseInt(electionId),
    });

    if (res.isSuccess) {
      setName(""); // Clear form
      setVoterNic(""); // Clear form
      setVoterEmail("");
      setMessage("Voter added successfully!");
      toast.success("Voter added successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear success message after 3 seconds
    } else {
      setError(res.response.data.message);
      toast.error("Unique index or primary key violation");
    }
  };

  return (
    <>
      <div className="h-[65px] bg-blue-800 shadow-lg rounded-b-xl">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <h1 className="text-2xl font-bold text-white">E-Voting System</h1>
          <nav className="space-x-4">
            <Link
              to="/election/new"
              className="px-5 py-3 text-white transition duration-200 border border-white rounded-full hover:bg-white hover:text-gray-800"
            >
              Back to Create Election
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen py-10 bg-white">
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
              <p className="mt-2 font-medium text-center text-red-600">
                {error}
              </p>
            )}
          </form>

          <div className="my-6 font-semibold text-center text-red-500">OR</div>

          {/* CSV Uploader */}
          <CsvUploader fileType={fileType} />

          {/* Voter List */}
          <VoterList electionId={electionId} />
        </div>
      </div>
    </>
  );
};

export default VoterForm;
