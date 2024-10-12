import React, { createContext, useEffect, useState } from "react";
import {
  getElectionList,
  getElegibleElectionList,
} from "../services/electionService";

export const ElectionContext = createContext({});

const ElectionContextProvider = (props) => {
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections
  const [happeningElections, setHappeningElections] = useState([]);
  const [voterId, setVorterId] = useState(null);
  const [nic, setNic] = useState("");

  const [election, setElection] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const filterElectionList = async (response) => {
    setHappeningElections(
      response.filter(
        (election) =>
          new Date(election.startDate) < new Date() &&
          new Date(election.endDate) > new Date()
      )
    );
  };

  const fetchElectionList = async (nic) => {
    const response = await getElegibleElectionList(nic);
    console.log(response);

    setElections(response);
    filterElectionList(response);
  };

  const values = {
    electionId,
    setElectionId,
    elections,
    setElections,
    election,
    setElection,
    happeningElections,
    voterId,
    setVorterId,
    nic,
    setNic,
    fetchElectionList,
  };

  return (
    <ElectionContext.Provider value={values}>
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionContextProvider;
