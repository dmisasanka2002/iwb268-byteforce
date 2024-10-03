import React, { createContext, useEffect, useState } from "react";
import { getElectionList } from "../services/electionService";

export const ElectionContext = createContext({});

const ElectionContextProvider = (props) => {
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections
  const [happeningElections, setHappeningElections] = useState([]);

  const [election, setElection] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const filterElectionList = async (response) => {
    setHappeningElections(response);
  };

  const fetchElectionList = async () => {
    const response = await getElectionList();
    setElections(response);
    filterElectionList(response);
  };

  useEffect(() => {
    fetchElectionList();
  }, []);

  const values = {
    electionId,
    setElectionId,
    elections,
    setElections,
    election,
    setElection,
    happeningElections,
  };

  return (
    <ElectionContext.Provider value={values}>
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionContextProvider;
