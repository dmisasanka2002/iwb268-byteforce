import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

export const getCandidates = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
  );
  return response.data;
};

export const castVote = async (voteData) => {
  try {
    // TODO: Shold be checked the vote function.
    const response = await axios.post(`${backURL}/api/vote`, voteData);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
