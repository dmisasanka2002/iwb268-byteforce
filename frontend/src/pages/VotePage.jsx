import React, { useState, useEffect, useContext } from "react";
import { getCandidates, castVote } from "../services/voteService";
import { useParams } from "react-router-dom";
// import "../styles/VotePage.css";
import ConfirmationModal from "../components/ConfirmationModal";
import { ElectionContext } from "../contexts/ElectionContext";
import { toast } from "react-toastify";

const VotePage = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [candidateToVote, setCandidateToVote] = useState(null);

  const { nic } = useContext(ElectionContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await getCandidates(id);
      setCandidates(response);
    };

    fetchCandidates();
  }, [electionId]);

  const handleVoteClick = (candidate) => {
    setCandidateToVote(candidate); // Save the candidate to vote for
    setMessage(`Are you sure you want to vote for ${candidate?.name}?`);
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmVote = async () => {
    if (!hasVoted && candidateToVote) {
      const res = await castVote({
        election_id: parseInt(id),
        candidateId: parseInt(candidateToVote.id),
        voterNic: nic,
      });

      if (res.isSuccess) {
        setHasVoted(true);
        setShowModal(false); // Hide the modal after vote
        alert("Vote cast successfully!");
        toast.success("Vote cast successfully!");
      } else {
        // alert(res.message);
        toast.error(res.message);
      }
    }
  };

  const handleCancelVote = () => {
    setShowModal(false); // Close the modal on cancel
    setCandidateToVote(null); // Reset the selected candidate
  };

  return (
    <div
      className="vote-page relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/election-bg-III.jpg')` }}
    >
      <h2 className="text-5xl font-bold text-white mb-8 pb-6">
        Vote for Your Candidate
      </h2>
      {hasVoted ? (
        <p className="text-white text-lg">Thank you! You have already voted!</p>
      ) : (
        <div className="candidates-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="candidate-card flex items-center bg-white/30 backdrop-blur-lg rounded-lg p-4 shadow-lg"
            >
              <img
                src="/images/candidate-img.png"
                alt={candidate.name}
                className="w-16 h-16 rounded-full mr-4"
              />{" "}
              {/* Hardcoded image */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {candidate.name}
                </h3>
                <p className="text-gray-700">{candidate.description}</p>
              </div>
              <button
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => handleVoteClick(candidate)}
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
          message={message}
          // message={`Are you sure you want to vote for ${candidateToVote?.name}?`}
          onConfirm={handleConfirmVote}
          onCancel={handleCancelVote}
        />
      )}
    </div>
  );
};

export default VotePage;
