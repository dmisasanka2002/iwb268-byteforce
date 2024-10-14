import React from "react";

const ResultCard = ({ candidate, totalVotes }) => {
  const votePercentage = candidate.votes
    ? ((candidate.votes / totalVotes) * 100).toFixed(2)
    : 0;

  return (
    <div className="flex items-center p-4 rounded-lg shadow-md result-card bg-blue-50">
      <img
        src="/images/candidate-img.png"
        alt={candidate.name}
        className="w-16 h-16 mr-4 rounded-full"
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 candidate-name">
          {candidate.name}
        </h3>
        <p className="text-gray-700 candidate-votes">
          Votes: {candidate.votes}
        </p>
        <p className="text-gray-500">({votePercentage}% of total votes)</p>
      </div>
    </div>
  );
};

export default ResultCard;
