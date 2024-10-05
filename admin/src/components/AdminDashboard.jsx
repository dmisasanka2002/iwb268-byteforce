import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ElectionContext } from "../contexts/ElectionContext";

const AdminDashboard = () => {
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

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 h-16">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-white text-2xl font-bold">E-Voting System</h1>
          <nav className="space-x-4">
            <Link to="/election/new" className="border border-white rounded-full px-5 py-3 text-white hover:bg-white hover:text-gray-800 transition duration-200">
              Create New Election
            </Link>
            <Link to="/election/about" className="border border-white rounded-full px-5 py-3 text-white hover:bg-white hover:text-gray-800 transition duration-200">
              About Us
            </Link>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-800 via-blue-800 to-blue-800 py-8">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl font-semibold text-white mb-4">Welcome to Administrative Control</h1>
          <h2 className="text-center text-1xl font-normal text-white mb-32">The Online Voting System is a secure and user-friendly platform designed to streamline the electoral process. It enables voters to cast their votes conveniently from any location using their devices, ensuring accessibility and inclusivity. The system incorporates advanced security measures, including encryption and authentication, to safeguard voter data and maintain the integrity of the election. With real-time tracking and transparent results, the Online Voting System enhances voter engagement and trust in the electoral process, making it an efficient solution for modern democracies.</h2>

          <div className="space-y-8">
            {/* Happening Elections */}
            <div className="happening-elections bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-sans text-white mb-4">Happening Elections</h2>
              {happeningElections.length > 0 ? (
                <ul>
                  {happeningElections.map((election, index) => (
                    <li key={index} className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2 py-2">
                      <div className="name text-lg  font-medium">{election.name}</div>
                      <div className="buttons">
                        <button className="bg-gray-400 text-white rounded-full px-4 py-1 cursor-not-allowed" disabled>
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
              <h2 className="text-3xl font-sans text-white mb-4">Upcoming Elections</h2>
              {upcomingElections.length > 0 ? (
                <ul>
                  {upcomingElections.map((election, index) => (
                    <li key={index} className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2">
                      <div className="name text-lg font-medium">{election.name}</div>
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
                    <li key={index} className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2">
                      <div className="name text-lg font-medium">{election.name}</div>
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
