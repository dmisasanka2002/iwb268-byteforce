import React, { createContext, useState } from "react";
import { getElegibleElectionList } from "../services/electionService";

export const ElectionContext = createContext({});

/**
 * Provider for the ElectionContext.
 * This provider fetches the list of elections that a voter is eligible for,
 * and filters the list to only contain the elections that are currently happening.
 * The state of the provider includes the list of elections, the ID of the election that the
 * voter is currently voting in, the voter's NIC, and the election object.
 * The provider also provides a function to fetch the list of elections, given a voter's NIC.
 * @param {object} props - Props passed to the component.
 * @return {JSX.Element} - The JSX element containing the ElectionContext.Provider.
 */
const ElectionContextProvider = (props) => {
  const [electionId, setElectionId] = useState(null);
  const [elections, setElections] = useState([]); // Store created elections
  const [happeningElections, setHappeningElections] = useState([]);
  const [nic, setNic] = useState(null);

  const [election, setElection] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  /**
   * Filter the list of elections to only contain the elections that are currently happening.
   * @param {Election[]} response - The response from the backend containing the list of elections.
   * @return {void} - No return value.
   */
  const filterElectionList = async (response) => {
    setHappeningElections(
      response.filter(
        (election) =>
          new Date(election.startDate) < new Date() &&
          new Date(election.endDate) > new Date()
      )
    );
  };

  /**
   * Fetches the list of elections that a voter is eligible for, given a voter's NIC.
   * The list of elections is filtered to only contain the elections that are currently happening.
   * @param {string} nic - The NIC of the voter.
   * @return {void} - No return value.
   */
  const fetchElectionList = async (nic) => {
    const response = await getElegibleElectionList(nic);

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
