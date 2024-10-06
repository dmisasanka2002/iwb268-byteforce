import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import { Link } from "react-router-dom";

function HappeningElections() {
  const { happeningElections, electionId, setElectionId } =
    useContext(ElectionContext);
  return (
    <div className="space-y-8">
      {/* Happening Elections */}
      <div className="happening-elections bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        {happeningElections.length > 0 ? (
          <ul>
            {happeningElections.map((election, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-neutral-300 rounded-md p-3 mb-2 py-2"
              >
                <div className="name text-lg  font-medium">{election.name}</div>
                <div className="buttons">
                  <Link
                    to={`/voter/vote/${election.id}`}
                    className="inline-block px-4 py-3 mt-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Click To Vote
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No ongoing elections.</p>
        )}
      </div>
    </div>
  );
}

export default HappeningElections;
