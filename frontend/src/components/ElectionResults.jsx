import React, { useState, useEffect } from "react";
import { getElectionResults } from "../services/electionService";

const ElectionResults = ({ electionId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await getElectionResults(electionId);
      setResults(response);
    };

    fetchResults();
  }, [electionId]);

  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {results
          .sort((a, b) => b.votes - a.votes)
          .map((candidate, index) => (
            <li key={index}>
              {candidate.name}: {candidate.votes} votes
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ElectionResults;
