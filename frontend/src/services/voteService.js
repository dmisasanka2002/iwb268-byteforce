import axios from "axios";

export const getCandidates = async (electionId) => {
  const response = await axios.get(`/api/elections/${electionId}/candidates`);
  return response.data;
};

export const castVote = async (voteData) => {
  const response = await axios.post(`/api/votes`, voteData);
  return response.data;
};
