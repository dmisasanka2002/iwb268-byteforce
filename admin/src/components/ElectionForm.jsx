import React, { useContext, useState } from "react";
import { createElection } from "../services/electionService";
import { ElectionContext } from "../contexts/ElectionContext";
import { useNavigate } from "react-router-dom";

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
    setElectionId(response.id);
    navigate(`/election/${response.id}/add/candidates`);
    console.log(response);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Election Title"
        required
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <button type="submit">Create Election</button>
    </form>
  );
};

export default ElectionForm;
