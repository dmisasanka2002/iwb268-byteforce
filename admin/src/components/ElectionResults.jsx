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
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Election Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
