import React, { createContext, useState } from "react";

export const ElectionContext = createContext({});

const ElectionContextProvider = (props) => {
  const [electionCreated, setElectionCreated] = useState(false);
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections
  const [election, setElection] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  const values = {
    electionCreated,
    setElectionCreated,
    electionId,
    setElectionId,
    elections,
    setElections,
    election,
    setElection,
  };

  return (
    <ElectionContext.Provider value={values}>
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionContextProvider;
