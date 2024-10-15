import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { getCandidates, updateCandidate } from "../services/electionService"; // Import the updateCandidate function
import "../styles/CandidateList.css"; // Import CSS for styling
import { ElectionContext } from "../contexts/ElectionContext";
import { toast } from "react-toastify";

/**
 * A component that displays a list of candidates for an election and allows
 * a user to edit one of them. The component fetches the list of candidates
 * from the server and displays them in an unordered list. Each candidate is
 * displayed with their number and name, and an edit button. When the edit
 * button is clicked, a form appears to allow the user to edit the candidate's
 * name. After the user submits the form, the component updates the candidate
 * list with the new name. If the user clicks the cancel button, the form
 * disappears and the candidate list is not updated.
 *
 * @param {string} electionId - The id of the election whose candidates should
 * be displayed.
 * @returns {React.ReactElement} - A React component that renders the candidate
 * list and edit form.
 */
const CandidateList = ({ electionId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track editing
  const [editCandidate, setEditCandidate] = useState(null); // Candidate being edited
  const [candidateId, setCandidateId] = useState();

  const navigate = useNavigate(); // Initialize useNavigate hook

  /**
   * Fetches the list of candidates for an election and updates the component's
   * state with the response. If the request is successful, the candidate list
   * is updated. If the request fails, the error message is updated.
   * @returns {void} - No return value.
   */
  const fetchCandidates = async () => {
    try {
      const res = await getCandidates(electionId);

      if (res.status == 200) {
        setCandidates(res.data);
      } else {
        setError("Failed to fetch candidates.");
      }
    } catch (err) {
      setError("An error occurred while fetching candidates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [electionId]);

  // Handle edit button click
  const handleEditClick = (candidate) => {
    setIsEditing(true);
    setCandidateId(candidate.id);
    console.log(candidate);

    setEditCandidate({
      election_id: candidate.election_id,
      name: candidate.name,
      number: candidate.number,
      votes: candidate.votes,
    });
  };

  // Handle update candidate form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setEditCandidate((editCandidate) => ({
        ...editCandidate,
        number: parseInt(editCandidate.number),
      }));
      console.log(editCandidate);

      const res = await updateCandidate(candidateId, editCandidate); // Call update function
      if (res.isSuccess) {
        toast.success(res.message);
        // Update the candidates list after successful edit
        setCandidates((prevCandidates) =>
          prevCandidates.map((c) =>
            c.id === editCandidate.id ? editCandidate : c
          )
        );
        setIsEditing(false); // Close the editing mode
      } else {
        setError("Failed to update candidate.");
      }
    } catch (error) {
      setError("An error occurred while updating the candidate.");
    }
  };

  // Handle form changes for the edit candidate
  const handleChange = (e) => {
    setEditCandidate({ ...editCandidate, [e.target.name]: e.target.value });
  };

  // Function to navigate to the add voters page
  const handleAddVotersClick = () => {
    navigate(`/election/${electionId}/add/voters`); // Navigate to the specified path
  };

  return (
    <div className="candidate-list-container">
      <h2 className="font-sans font-semibold list-title">Candidate List</h2>

      {loading ? (
        <p>Loading candidates...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : candidates.length > 0 ? (
        <ul className="candidate-list">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="candidate-item">
              <span className="candidate-number">{candidate.number}. </span>
              <span className="candidate-name">{candidate.name}</span>
              <button
                className="edit-btn"
                onClick={() => handleEditClick(candidate)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates added yet.</p>
      )}

      {/* Edit form appears when a candidate is being edited */}
      {isEditing && editCandidate && (
        <div className="edit-form-container">
          <h2>Edit Candidate</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label>Candidate Number</label>
              <input
                type="number"
                name="number"
                value={editCandidate.number}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editCandidate.name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Update Candidate
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Button to navigate to add voters */}
      <button
        onClick={handleAddVotersClick}
        className="w-full px-4 py-3 text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-700"
      >
        Next For Add Voters
      </button>
    </div>
  );
};

export default CandidateList;
