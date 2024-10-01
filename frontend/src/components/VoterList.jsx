// src/components/VoterList.jsx

import React, { useEffect, useState } from "react";
import { getVoters } from "../services/electionService"; // Assume you have a function to get voters
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/VoterList.css"; // Import CSS for styling

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await getVoters(); // Call function to fetch voters
        if (res.success) {
          setVoters(res.voters);
        } else {
          setError("Failed to fetch voters.");
        }
      } catch (err) {
        setError("An error occurred while fetching voters.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  // Function to navigate to the root path
  const handleNextClick = () => {
    navigate("/"); // Navigate to the root path
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
      <button onClick={handleNextClick} className="next-btn">
        Next
      </button>
    </div>
  );
};

export default VoterList;
