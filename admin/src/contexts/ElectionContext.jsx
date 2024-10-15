import React, { createContext, useEffect, useState } from "react";
import { getElectionList } from "../services/electionService";

export const ElectionContext = createContext({});

/**
 * Provides the state and functions for the ElectionContext.
 * The state of the provider includes the list of elections, the ID of the election that the
 * user is currently voting in, the user's NIC, the election object, and a boolean indicating
 * whether the user has created an election.
 * The provider also provides a function to fetch the list of elections, given a user's NIC.
 * @param {object} props - Props passed to the component.
 * @return {JSX.Element} - The JSX element containing the ElectionContext.Provider.
 */
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
