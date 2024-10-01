import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

export const getCandidates = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/elections/${electionId}/candidates`
  );
  return response.data;
};

export const castVote = async (voteData) => {
  const response = await axios.post(`${backURL}/api/votes`, voteData);
  return response.data;
};
