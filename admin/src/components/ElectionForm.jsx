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
      <div className="h-[65px] bg-blue-800 shadow-lg rounded-b-xl">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <h1 className="text-2xl font-bold text-white">E-Voting System</h1>
          <nav className="space-x-4">
            <Link
              to="/admin-dashboard"
              className="px-5 py-3 text-white transition duration-200 border border-white rounded-full hover:bg-white hover:text-gray-800"
            >
              Back To Dashboard
            </Link>
          </nav>
        </div>
      </div>

      {/* Election Form */}
      <div className="flex items-center justify-center min-h-screen bg-white">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-8 space-y-6 bg-white rounded-lg shadow-lg bg-opacity-80"
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
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Create Election
          </button>
        </form>
      </div>
    </>
  );
};

export default ElectionForm;
