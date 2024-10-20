import React, { useState, useEffect, useContext } from "react";
import { getCandidates, castVote } from "../services/voteService";
import { useParams } from "react-router-dom";
// import "../styles/VotePage.css";
import ConfirmationModal from "../components/ConfirmationModal";
import { ElectionContext } from "../contexts/ElectionContext";
import { toast } from "react-toastify";

/**
 * A page that displays a list of candidates for an election and allows a voter
 * to vote for one of them. The page will display a confirmation modal before
 * submitting the vote to the server. If the vote is successful, the page will
 * display a success message and disable all the vote buttons. If the vote fails,
 * the page will display an error message.
 *
 * @param {string} electionId - The id of the election for which the vote is being cast.
 * @returns {React.ReactElement} - A React component that renders the vote page.
 */
const VotePage = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [candidateToVote, setCandidateToVote] = useState(null);

  const { nic } = useContext(ElectionContext);

  const { id } = useParams();

  useEffect(() => {
    /**
     * Fetches the list of candidates for the election and updates the component's
     * state with the response.
     */
    const fetchCandidates = async () => {
      const response = await getCandidates(id);
      setCandidates(response);
    };

    fetchCandidates();
  }, [electionId]);

  /**
   * Handles a vote button click event. It sets the candidate to vote for in the
   * component's state and displays a confirmation modal to confirm the vote.
   *
   * @param {Object} candidate - The candidate object to vote for.
   */
  const handleVoteClick = (candidate) => {
    setCandidateToVote(candidate); // Save the candidate to vote for
    setMessage(`Are you sure you want to vote for ${candidate?.name}?`);
    setShowModal(true); // Show the confirmation modal
  };

  /**
   * Handles the confirmation button click event in the confirmation modal.
   *
   * If the voter has not voted before and the candidate to vote for is not null,
   * it will cast the vote to the server and update the component's state with the
   * response. If the vote is successful, it will show a success message and disable
   * all the vote buttons. If the vote fails, it will show an error message.
   */
  const handleConfirmVote = async () => {
    if (!hasVoted && candidateToVote) {
      const res = await castVote({
        election_id: parseInt(id),
        candidateId: parseInt(candidateToVote.id),
        voterNic: nic,
      });

      console.log(res.status);

      if (res.status == 200) {
        setHasVoted(true);
        setShowModal(false); // Hide the modal after vote
        localStorage.removeItem("verify");
        toast.success("Vote cast successfully!");
      } else {
        // alert(res.message);
        toast.error(res.data.message);
      }
    }
  };

  /**
   * Handles the cancel button click event in the confirmation modal.
   *
   * It hides the modal and resets the selected candidate to null.
   */
  const handleCancelVote = () => {
    setShowModal(false); // Close the modal on cancel
    setCandidateToVote(null); // Reset the selected candidate
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover vote-page"
      style={{ backgroundImage: `url('/images/election-bg-III.jpg')` }}
    >
      <h2 className="pb-6 mb-8 text-5xl font-bold text-white">
        Vote for Your Candidate
      </h2>
      {hasVoted ? (
        <p className="text-lg text-white">Thank you! You have already voted!</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6 candidates-list sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center p-4 rounded-lg shadow-lg candidate-card bg-white/30 backdrop-blur-lg"
            >
              <img
                src="/images/candidate-img.png"
                alt={candidate.name}
                className="w-16 h-16 mr-4 rounded-full"
              />{" "}
              {/* Hardcoded image */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {candidate.name}
                </h3>
                <p className="text-gray-700">{candidate.description}</p>
              </div>
              <button
                className="px-4 py-2 ml-4 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
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
          onConfirm={handleConfirmVote}
          onCancel={handleCancelVote}
        />
      )}
    </div>
  );
};

export default VotePage;
