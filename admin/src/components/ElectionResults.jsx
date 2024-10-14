import React, { useState, useEffect } from "react";
import { getElectionResults } from "../services/electionService";
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
    <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-blue-600">
        Election Results
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {results.map((candidate, index) => (
          <ResultCard
            key={index}
            candidate={candidate}
            totalVotes={results.reduce((acc, curr) => acc + curr.votes, 0)}
          />
        ))}
      </div>
    </div>
  );
};

export default ElectionResults;
