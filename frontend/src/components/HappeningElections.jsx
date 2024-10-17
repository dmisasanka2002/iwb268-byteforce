import React, { useContext } from "react";
import { ElectionContext } from "../contexts/ElectionContext";
import { Link } from "react-router-dom";

/**
 * Component that displays a list of ongoing elections with a link to vote in each one.
 *
 * @returns {React.ReactElement} A React component that displays a list of ongoing elections.
 */

function HappeningElections() {
  const { happeningElections } = useContext(ElectionContext);

  return (
    <div className="space-y-8">
      {/* Happening Elections */}
      <div className="p-6 bg-white rounded-lg shadow-lg happening-elections bg-opacity-20 backdrop-blur-lg">
        {happeningElections.length > 0 ? (
          <ul>
            {happeningElections.map((election, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 py-2 mb-2 border rounded-md border-neutral-300"
              >
                <div className="text-lg font-medium name">{election.name}</div>
                <div className="buttons">
                  <Link
                    to={`/voter/vote/${election.id}`}
                    className="inline-block px-4 py-3 mt-3 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
