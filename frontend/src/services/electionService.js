import axios from "axios";

export const createElection = async (electionData) => {
  const response = await axios.post("/api/elections", electionData);
  return response.data;
};

export const addCandidate = async (candidateData) => {
  const response = await axios.post(`/api/candidates`, candidateData);
  return response.data;
};

export const addVoter = async (voterData) => {
  const response = await axios.post("/api/voters", voterData);
  return response.data;
};

export const getElectionResults = async (electionId) => {
  const response = await axios.get(`/api/elections/${electionId}/results`);
  return response.data;
};
