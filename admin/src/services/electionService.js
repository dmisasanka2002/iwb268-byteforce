import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

/**
 * Creates a new election with the given title, start time, and end time.
 *
 * @param {Object} electionData - An object containing the title, start time, and end time of the election.
 * @return {Promise<Object>} - A promise that resolves with the newly created election's data.
 */
export const createElection = async (electionData) => {
  const response = await axios.post(`${backURL}/api/election/create`, {
    name: electionData.title,
    startTime: new Date(electionData.startTime),
    endTime: new Date(electionData.endTime),
  });

  return response.data;
};

/**
 * Uploads a file to the server and returns the server's response.
 *
 * @param {File} file - The file to be uploaded.
 * @param {string} fileType - The type of the file to be uploaded. Must be either "CANDIDATES" or "VOTERS".
 * @param {number} electionId - The id of the election to which the file is being uploaded.
 * @return {Promise<Object>} - A promise that resolves to the server's response.
 */
export const uploadFile = async (file, fileType, electionId) => {
  try {
    const responce = await axios.post(
      `${backURL}/api/upload/file/${fileType.toUpperCase()}/${electionId}`,
      file
    );

    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Fetches a list of all elections from the server.
 *
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects,
 * each of which contains the id, name, startTime, and endTime of an election.
 */
export const getElectionList = async () => {
  const response = await axios.get(`${backURL}/api/election/list`);

  return response.data;
};

/**
 * Adds a new candidate to an election.
 *
 * @param {Object} candidateData - An object that must contain the following properties:
 * - name: The name of the candidate.
 * - number: The number of the candidate.
 * - election_id: The id of the election to which to add the candidate.
 *
 * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
 * - success: A boolean indicating whether the candidate was successfully added.
 * - message: A string describing the result of the request.
 */
export const addCandidate = async (candidateData) => {
  const response = await axios.post(
    `${backURL}/api/addCandidate`,
    candidateData
  );

  return response.data;
};

/**
 * Adds a new voter to an election.
 *
 * @param {Object} voterData - An object that must contain the following properties:
 * - name: The name of the voter.
 * - email: The email address of the voter.
 * - nic: The NIC number of the voter.
 * - election_id: The id of the election to which to add the voter.
 *
 * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
 * - success: A boolean indicating whether the voter was successfully added.
 * - message: A string describing the result of the request.
 */
export const addVoter = async (voterData) => {
  try {
    const response = await axios.post(`${backURL}/api/addVoter`, voterData);

    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Fetches the results of an election.
 *
 * @param {string} electionId - The id of the election whose results to fetch.
 *
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects,
 * each of which contains the id, name, and number of a candidate in the election,
 * as well as the number of votes the candidate received.
 */
export const getElectionResults = async (electionId) => {
  // const response = await axios.get(`${backURL}/api/finalResult/${electionId}`);
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
  );

  return response.data;
};

/**
 * Fetches a list of voters who have been assigned to an election.
 *
 * @param {string} electionId - The id of the election.
 *
 * @return {Promise<Object[]>} - A promise that resolves to a list of Voter objects.
 */
export const getAssignedVoters = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/elections/${electionId}/assigned_voters`
  );
  const data = await response.data;
  return data; // Assuming the API returns this field
};

/**
 * Fetches the list of candidates for an election.
 *
 * @param {string} electionId - The id of the election whose candidates to fetch.
 *
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

    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Fetches a list of voters for an election.
 *
 * @param {string} electionId - The id of the election.
 *
 * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
 * - success: A boolean indicating whether the request was successful.
 * - message: A string describing the result of the request, whether it was successful or not.
 * - data: An array of Voter objects if the request was successful.
 */
export const getVoters = async (electionId) => {
  try {
    const response = await axios.get(
      `${backURL}/api/voters/list/${electionId}`
    );

    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Updates a candidate with the given id and data.
 *
 * @param {string} candidateId - The id of the candidate to update.
 * @param {Object} updatedData - An object with the updated properties of the candidate.
 *
 * @return {Promise<Object>} - A promise that resolves to an object with the following properties:
 * - success: A boolean indicating whether the request was successful.
 * - message: A string describing the result of the request, whether it was successful or not.
 */
export const updateCandidate = async (candidateId, updatedData) => {
  console.log(updatedData);

  try {
    const response = await axios.put(
      `${backURL}/api/candidate/update/${candidateId}`,
      updatedData
    );
    console.log(response);

    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
