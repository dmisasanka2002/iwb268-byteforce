import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

export const getCandidates = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
  );
  return response.data;
};

export const castVote = async (voteData) => {
  console.log(voteData);

  const response = await axios.put(`${backURL}/api/vote`, voteData);
  console.log(response);

  return response.data;
};
