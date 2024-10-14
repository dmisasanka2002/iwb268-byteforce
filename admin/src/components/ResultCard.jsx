import React from "react";

const ResultCard = ({ candidate, totalVotes }) => {
  const votePercentage = candidate.votes
    ? ((candidate.votes / totalVotes) * 100).toFixed(2)
    : 0;

  return (
    <div className="result-card bg-blue-50 p-4 rounded-lg shadow-md flex items-center">
      <img
        src="/images/candidate-img.png"
        alt={candidate.name}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="candidate-name text-xl font-semibold text-gray-800">
          {candidate.name}
        </h3>
        <p className="candidate-votes text-gray-700">
          Votes: {candidate.votes}
        </p>
        <p className="text-gray-500">({votePercentage}% of total votes)</p>
      </div>
    </div>
  );
};

export default ResultCard;
