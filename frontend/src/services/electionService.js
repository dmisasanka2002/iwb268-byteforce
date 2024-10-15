import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

/**
 * Fetches a list of elections that a voter with the given NIC is eligible to vote in.
 * @param {string} voterNIC - The NIC of the voter.
 * @return {Promise<Object[]>} - A promise that resolves to a list of Election objects
 * that the voter is eligible to vote in.
 */
export const getElegibleElectionList = async (voterNIC) => {
  const response = await axios.get(
    `${backURL}/api/election/eligible/list/${voterNIC}`
  );

  return response.data;
};

/**
 * Fetches the list of candidates for the given election.
 * @param {number} electionId - The id of the election to fetch candidates for.
 * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
 * - success: A boolean indicating whether the request was successful.
 * - message: A string describing the result of the request, whether it was successful or not.
 * - data: An array of Candidate objects if the request was successful.
 */
export const getCandidates = async (electionId) => {
  try {
    const response = await axios.get(
      `${backURL}/api/candidates/list/${electionId}`
    );
    // console.log(response);

    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
