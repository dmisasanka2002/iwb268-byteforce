import React, { useState, useEffect } from "react";
import { getCandidates, castVote } from "../services/voteService";
import { useParams } from "react-router-dom";

const VotePage = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await getCandidates(electionId);
      setCandidates(response);
    };

    fetchCandidates();
  }, [electionId]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!hasVoted && selectedCandidate) {
      await castVote({ electionId, candidateId: selectedCandidate });
      setHasVoted(true);
    }
  };

  return (
    <div>
      {hasVoted ? (
        <p>You have already voted!</p>
      ) : (
        <form onSubmit={handleVote}>
          <label>Select a candidate to vote:</label>
          <select
            onChange={(e) => setSelectedCandidate(e.target.value)}
            required
          >
            <option value="">Select Candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit Vote</button>
        </form>
      )}
    </div>
  );
};

export default VotePage;
