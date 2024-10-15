import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import "../styles/ElectionList.css";
import { useNavigate } from "react-router-dom";

/**
 * Component that displays a list of elections with a link to vote in each one.
 *
 * @return {React.ReactElement} A React component that displays a list of elections.
 */

const ElectionList = () => {
  const {
    setElectionId,
    upcomingElections,
    happeningElections,
    closedElections,
  } = useContext(ElectionContext);

  const navigate = useNavigate();

  const handleButtonClick = (e, election_id) => {
    switch (e.target.textContent) {
      case "Add Candidates":
        setElectionId(election_id);
        navigate(`/election/${election_id}/add/candidates`);
        break;
      case "Add Voters":
        setElectionId(election_id);
        navigate(`/election/${election_id}/add/voters`);
        break;
      case "See Results":
        setElectionId(election_id);
        navigate(`/election/${election_id}`);
        break;
      default:
        break;
    }
  };

  /**
   * Converts a date string into a formatted date string, with the format
   * "MMMM DD, YYYY HH:mm:ss".
   *
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date string.
   */
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="space-y-8">
      {/* Happening Elections */}
      <div className="p-6 bg-gray-400 rounded-lg shadow-lg happening-elections bg-opacity-20 backdrop-blur-lg">
        <h2 className="mb-4 font-sans text-3xl text-black">
          Happening Elections
        </h2>
        {happeningElections.length > 0 ? (
          <ul>
            {happeningElections.map((election, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 py-2 mb-2 border rounded-md border-neutral-300"
              >
                <div className="text-lg font-medium name">
                  {election.name}
                  <span className="ml-2 text-sm text-gray-700">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="buttons">
                  <button
                    className="px-4 py-1 text-white bg-gray-400 rounded-full cursor-not-allowed"
                    disabled
                  >
                    See Results
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No ongoing elections.</p>
        )}
      </div>

      {/* Upcoming Elections */}
      <div className="p-6 bg-gray-400 rounded-lg shadow-lg upcoming-elections bg-opacity-20 backdrop-blur-lg">
        <h2 className="mb-4 font-sans text-3xl text-black">
          Upcoming Elections
        </h2>
        {upcomingElections.length > 0 ? (
          <ul>
            {upcomingElections.map((election, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 mb-2 border rounded-md border-neutral-300"
              >
                <div className="text-lg font-medium name">
                  {election.name}
                  <span className="ml-2 text-sm text-gray-700">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="space-x-2 buttons">
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="px-4 py-1 text-white transition duration-200 bg-blue-800 rounded-full hover:bg-blue-700"
                  >
                    Add Candidates
                  </button>
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="px-4 py-1 text-white transition duration-200 bg-green-600 rounded-full hover:bg-green-700"
                  >
                    Add Voters
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No upcoming elections.</p>
        )}
      </div>

      {/* Closed Elections */}
      <div className="p-6 bg-gray-400 rounded-lg shadow-lg closed-elections bg-opacity-20 backdrop-blur-lg">
        <h2 className="mb-4 font-sans text-3xl text-black">Closed Elections</h2>
        {closedElections.length > 0 ? (
          <ul>
            {closedElections.map((election, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 mb-2 border rounded-md border-neutral-300"
              >
                <div className="text-lg font-medium name">
                  {election.name}
                  <span className="ml-2 text-sm text-gray-700">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="px-4 py-1 text-white transition duration-200 bg-blue-800 rounded-full hover:bg-blue-700"
                  >
                    See Results
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No closed elections.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionList;
