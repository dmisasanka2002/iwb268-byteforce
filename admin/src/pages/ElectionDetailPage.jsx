import React, { useState, useEffect } from "react";
import ElectionResults from "../components/ElectionResults";
import PieChart from "../components/PieChart";
import { useParams } from "react-router-dom";
import {
  getElectionResults,
  getAssignedVoters,
} from "../services/electionService";

// Utility function to generate a color palette dynamically
const generateColorPalette = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors; // Evenly spacing colors around the color wheel
    colors.push(`hsl(${hue}, 70%, 60%)`); // Generating colors with distinct hues
  }
  return colors;
};

const ElectionDetailPage = () => {
  const { id } = useParams();
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [assignedVoters, setAssignedVoters] = useState(0);
  const [candidateVotes, setCandidateVotes] = useState([]);

  useEffect(() => {
    const fetchElectionStatistics = async () => {
      const results = await getElectionResults(id);
      const total = results.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      );

      // Fetch the total number of assigned voters for the given election
      const votersCount = await getAssignedVoters(id);

      const turnout = ((total / votersCount) * 100).toFixed(2); // Voter turnout as a percentage

      setTotalVotes(total);
      setVoterTurnout(turnout);
      setAssignedVoters(votersCount);
      setCandidateVotes(results);
    };

    fetchElectionStatistics();
  }, [id]);

  // Generate colors based on the number of candidates
  const candidateColors = generateColorPalette(candidateVotes.length);

  // Data for Voter Turnout Pie Chart
  const voterTurnoutData = {
    labels: ["Votes Cast", "Not Voted"],
    datasets: [
      {
        data: [totalVotes, assignedVoters - totalVotes],
        backgroundColor: ["#4CAF50", "#FF7043"],
        hoverBackgroundColor: ["#66BB6A", "#FF8A65"],
      },
    ],
  };

  // Data for Candidate Vote Distribution Pie Chart
  const candidateVoteData = {
    labels: candidateVotes.map((candidate) => candidate.name),
    datasets: [
      {
        data: candidateVotes.map((candidate) => candidate.votes),
        backgroundColor: candidateColors,
        hoverBackgroundColor: candidateColors.map((color) =>
          color.replace("60%", "70%")
        ), // Slightly lighter color on hover
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Election Detail
      </h1>

      {/* Statistics Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
          Statistics
        </h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-700">Total Votes</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {totalVotes}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-700">
              Total Registered Voters
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {assignedVoters}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-700">Voter Turnout</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {voterTurnout}%
            </p>
          </div>
        </div>
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <PieChart data={voterTurnoutData} title="Voter Turnout" />
        <PieChart
          data={candidateVoteData}
          title="Candidate Vote Distribution"
        />
      </div>

      {/* Election Results Component */}
      <ElectionResults electionId={id} />
    </div>
  );
};

export default ElectionDetailPage;
