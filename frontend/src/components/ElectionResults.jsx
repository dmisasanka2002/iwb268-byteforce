import React, { useState, useEffect } from "react";
import { getElectionResults } from "../services/electionService";
import "../styles/ElectionResults.css"; // Import CSS for ElectionResults styling
import ResultCard from "./ResultCard";

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
    <div className="results-container">
      <h2 className="results-title">Election Results</h2>
      <div className="results-list">
        {results.map((candidate, index) => (
          <ResultCard key={index} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default ElectionResults;
