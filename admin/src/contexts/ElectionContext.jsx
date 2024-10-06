import React, { createContext, useEffect, useState } from "react";
import { getElectionList } from "../services/electionService";

export const ElectionContext = createContext({});

const ElectionContextProvider = (props) => {
  const [electionCreated, setElectionCreated] = useState(false);
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [happeningElections, setHappeningElections] = useState([]);
  const [closedElections, setClosedElections] = useState([]);

  const [election, setElection] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const filterElectionList = (response) => {
    console.log(response);
    setUpcomingElections(
      response.filter((election) => new Date(election.startDate) > new Date())
    );
    setHappeningElections(
      response.filter(
        (election) =>
          new Date(election.startDate) < new Date() &&
          new Date(election.endDate) > new Date()
      )
    );
    setClosedElections(
      response.filter((election) => new Date(election.endDate) < new Date())
    );
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
    electionCreated,
    setElectionCreated,
    electionId,
    setElectionId,
    elections,
    setElections,
    election,
    setElection,
    upcomingElections,
    happeningElections,
    closedElections,
  };

  return (
    <ElectionContext.Provider value={values}>
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionContextProvider;
