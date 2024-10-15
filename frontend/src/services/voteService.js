import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

/**
 * Fetches the list of candidates for the given election.
 * @param {number} electionId - The id of the election to fetch candidates for.
 * @return {Promise<Object[]>} - A promise that resolves to an array of Candidate objects.
 */
export const getCandidates = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
  );
  return response.data;
};

/**
 * Cast a vote for a candidate in an election.
 * @param {Object} voteData An object with the following properties:
 * - electionId: The id of the election.
 * - candidateId: The id of the candidate to vote for.
 * - voterNIC: The NIC of the voter.
 * @return {Promise<Object>} A promise that resolves to an object with the
 * following properties:
 * - success: A boolean indicating whether the vote was successful.
 * - message: A string describing the result of the vote.
 */
export const castVote = async (voteData) => {
  try {
    // TODO: Shold be checked the vote function.
    const response = await axios.post(`${backURL}/api/vote`, voteData);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
