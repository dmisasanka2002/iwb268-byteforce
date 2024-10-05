// src/components/VoterList.jsx

import React, { useEffect, useState, useContext } from "react";
import { getVoters } from "../services/electionService"; // Assume you have a function to get voters
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/VoterList.css"; // Import CSS for styling
import { ElectionContext } from "../contexts/ElectionContext";

const VoterList = ({ electionId }) => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(electionId,"votersList")
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const { electionId } = useContext(ElectionContext);

  const fetchVoters = async () => {
    try {
      const res = await getVoters(electionId); // Call function to fetch voters
      if (res.status == 200) {
        setVoters(res.data);
      } else {
        setError("Failed to fetch voters.");
      }
    } catch (err) {
      setError("An error occurred while fetching voters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  // Function to navigate to the root path
  const handleNextClick = () => {
    navigate("/admin-dashboard"); // Navigate to the root path
  };

  return (
    <div className="voter-list-container">
      <h2 className="list-title">Voter List</h2>

      {loading ? (
        <p>Loading voters...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : voters.length > 0 ? (
        <ul className="voter-list">
          {voters.map((voter) => (
            <li key={voter.id} className="voter-item">
              <span className="voter-name">{voter.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No voters added yet.</p>
      )}

      {/* Button to navigate to the root path */}
      <button onClick={handleNextClick} className="w-full px-4 py-3 text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-700">
        Finish and Return Main
      </button>
    </div>
  );
};

export default VoterList;
