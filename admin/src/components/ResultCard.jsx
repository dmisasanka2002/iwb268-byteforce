import React from "react";
import "../styles/ResultCard.css"; // Import CSS for ResultCard styling

const ResultCard = ({ candidate }) => {
  // TODO: Add logic to calculate percentage of votes, decorate this component
  return (
    <div className="result-card">
      <h3 className="candidate-name">{candidate.name}</h3>
      <p className="candidate-votes">Votes: {candidate.votes}</p>
    </div>
  );
};

export default ResultCard;
