import React, { useState } from "react";
import ElectionForm from "./ElectionForm";
import CandidateForm from "./CandidateForm";
import VoterForm from "./VoterForm";
import "../styles/AdminDashboard.css"; // Custom styles

const AdminDashboard = () => {
  const [electionCreated, setElectionCreated] = useState(false);
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections

  // Callback for when an election is created
  const handleElectionCreated = (id) => {
    setElectionCreated(true);
    setElectionId(id); // Store the created election ID
    setElections([...elections, { id, name: `Election ${id}` }]); // Add to elections list
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Election Form */}
      <div className="form-container">
        <h2>Create New Election</h2>
        <ElectionForm onCreateElection={handleElectionCreated} />
      </div>

      {/* List of Created Elections */}
      <div className="elections-list">
        <h2>Created Elections</h2>
        {elections.length > 0 ? (
          <ul>
            {elections.map((election) => (
              <li key={election.id}>{election.name}</li>
            ))}
          </ul>
        ) : (
          <p>No elections created yet.</p>
        )}
      </div>

      {/* Show Candidate and Voter Forms only if an election is created */}
      {electionCreated ? (
        <>
          <div className="form-container">
            <h2>Add Candidates</h2>
            <CandidateForm electionId={electionId} />
          </div>
          <div className="form-container">
            <h2>Add Voters</h2>
            <VoterForm electionId={electionId} />
          </div>
        </>
      ) : (
        <div className="alert-message">
          <p>Please create an election to add candidates and voters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
