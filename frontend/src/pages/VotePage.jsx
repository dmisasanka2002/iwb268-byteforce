import React, { useState, useEffect } from "react";
import { getCandidates, castVote } from "../services/voteService";
import { useParams } from "react-router-dom";
import "../styles/VotePage.css";
import ConfirmationModal from "../components/ConfirmationModal";

const VotePage = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [candidateToVote, setCandidateToVote] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await getCandidates(1);
      setCandidates(response);
    };

    fetchCandidates();
  }, [electionId]);

  const handleVoteClick = (candidateId) => {
    setCandidateToVote(candidateId); // Save the candidate to vote for
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmVote = async () => {
    if (!hasVoted && candidateToVote) {
      await castVote({ electionId, candidateId: candidateToVote });
      setHasVoted(true);
      setShowModal(false); // Hide the modal after vote
      alert("Vote cast successfully!");
    }
  };

  const handleCancelVote = () => {
    setShowModal(false); // Close the modal on cancel
    setCandidateToVote(null); // Reset the selected candidate
  };

  return (
    <div className="vote-page">
      <h2 className="page-title">Vote for Your Candidate</h2>
      {hasVoted ? (
        <p className="message">Thank you! You have already voted!</p>
      ) : (
        <div className="candidates-list">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <h3 className="candidate-name">{candidate.name}</h3>
              <p className="candidate-description">{candidate.description}</p>
              <button
                className="vote-button"
                onClick={() => handleVoteClick(candidate.id)}
                disabled={hasVoted}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to vote for this candidate?"
          onConfirm={handleConfirmVote}
          onCancel={handleCancelVote}
        />
      )}
    </div>
  );
};

export default VotePage;
