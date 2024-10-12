import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import "../styles/ElectionList.css";
import { useNavigate } from "react-router-dom";

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
      <div className="happening-elections bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-sans text-white mb-4">
          Happening Elections
        </h2>
        {happeningElections.length > 0 ? (
          <ul>
            {happeningElections.map((election, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2 py-2"
              >
                <div className="name text-lg font-medium">
                  {election.name}
                  <span className="text-sm text-gray-300 ml-2">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="buttons">
                  <button
                    className="bg-gray-400 text-white rounded-full px-4 py-1 cursor-not-allowed"
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
      <div className="upcoming-elections bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-sans text-white mb-4">
          Upcoming Elections
        </h2>
        {upcomingElections.length > 0 ? (
          <ul>
            {upcomingElections.map((election, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2"
              >
                <div className="name text-lg font-medium">
                  {election.name}
                  <span className="text-sm text-gray-300 ml-2">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="buttons space-x-2">
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="bg-blue-800 text-white rounded-full px-4 py-1 hover:bg-blue-700 transition duration-200"
                  >
                    Add Candidates
                  </button>
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="bg-green-600 text-white rounded-full px-4 py-1 hover:bg-green-700 transition duration-200"
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
      <div className="closed-elections bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-sans text-white mb-4">Closed Elections</h2>
        {closedElections.length > 0 ? (
          <ul>
            {closedElections.map((election, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2"
              >
                <div className="name text-lg font-medium">
                  {election.name}
                  <span className="text-sm text-gray-300 ml-2">
                    ({formatDateTime(election.startDate)} -{" "}
                    {formatDateTime(election.endDate)})
                  </span>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => handleButtonClick(e, election.id)}
                    className="bg-blue-800 text-white rounded-full px-4 py-1 hover:bg-blue-700 transition duration-200"
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
