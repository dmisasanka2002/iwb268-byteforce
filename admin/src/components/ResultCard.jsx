import React from "react";

/**
 * A component that displays the result of a candidate in an election.
 *
 * @param {{name: string, votes: number}} candidate The candidate object with name and votes.
 * @param {number} totalVotes The total number of votes in the election.
 * @returns {JSX.Element} A JSX element representing the result card.
 */
const ResultCard = ({ candidate, totalVotes }) => {
  const votePercentage = candidate.votes
    ? ((candidate.votes / totalVotes) * 100).toFixed(2)
    : 0;

  return (
    <div className="flex items-center p-4 rounded-lg shadow-md result-card bg-blue-50  ">
      <div>
        <img
          src="/images/candidate-img.png"
          alt={candidate.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800 candidate-name">
            {candidate.name}
          </h3>
          <p className="text-gray-700 candidate-votes">
            Votes: {candidate.votes}
          </p>
        </div>
        <p className="text-gray-500">({votePercentage}% of total votes)</p>
      </div>
    </div>
  );
};

export default ResultCard;
