import React, { useState, useEffect } from "react";
import { getCandidates, castVote } from "../services/voteService";
import { useParams } from "react-router-dom";
// import "../styles/VotePage.css";
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
    // <div className="vote-page">
    //   <h2 className="page-title">Vote for Your Candidate</h2>
    //   {hasVoted ? (
    //     <p className="message">Thank you! You have already voted!</p>
    //   ) : (
    //     <div className="candidates-list">
    //       {candidates.map((candidate) => (
    //         <div key={candidate.id} className="candidate-card">
    //           <h3 className="candidate-name">{candidate.name}</h3>
    //           <p className="candidate-description">{candidate.description}</p>
    //           <button
    //             className="vote-button"
    //             onClick={() => handleVoteClick(candidate.id)}
    //             disabled={hasVoted}
    //           >
    //             Vote
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   {showModal && (
    //     <ConfirmationModal
    //       message="Are you sure you want to vote for this candidate?"
    //       onConfirm={handleConfirmVote}
    //       onCancel={handleCancelVote}
    //     />
    //   )}
    // </div>
    <div className="vote-page relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/images/election-bg-III.jpg')` }}>
    <h2 className="text-5xl font-bold text-white mb-8 pb-6">Vote for Your Candidate</h2>
    {hasVoted ? (
      <p className="text-white text-lg">Thank you! You have already voted!</p>
    ) : (
      <div className="candidates-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card flex items-center bg-white/30 backdrop-blur-lg rounded-lg p-4 shadow-lg">
            <img src="/images/candidate-img.png" alt={candidate.name} className="w-16 h-16 rounded-full mr-4" /> {/* Hardcoded image */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
              <p className="text-gray-700">{candidate.description}</p>
            </div>
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
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
