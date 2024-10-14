import React, { useContext, useState } from "react";
import { createElection } from "../services/electionService";
import { ElectionContext } from "../contexts/ElectionContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ElectionForm = () => {
  const {
    setElectionId,
    setElection,
    setElectionCreated,
    setElections,
    elections,
  } = useContext(ElectionContext);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setElectionCreated(true);
    setElection({ title, startTime, endTime });
    setElections([...elections, { title, name: `Election ${title}` }]); // Add to elections list

    const response = await createElection({ title, startTime, endTime });

    if (response.isSuccess) {
      setElectionId(response.body.id);
      toast.success(response.message);

      navigate(`/election/${response.body.id}/add/candidates`);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 h-16">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-white text-2xl font-bold">E-Voting System</h1>
          <nav className="space-x-4">
            <Link
              to="/admin-dashboard"
              className="border border-white rounded-full px-5 py-3 text-white hover:bg-white hover:text-gray-800 transition duration-200"
            >
              Back To Dashboard
            </Link>
          </nav>
        </div>
      </div>

      {/* Election Form */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Election
          </h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Election Title"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200"
          >
            Create Election
          </button>
        </form>
      </div>
    </>
  );
};

export default ElectionForm;
