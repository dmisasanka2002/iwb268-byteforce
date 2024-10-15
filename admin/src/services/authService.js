import axios from "axios";

/**
 * Verifies a voter by their email address and NIC number.
 *
 * @param {Object} voterData - An object with two properties: email and nic.
 * @returns {Promise<Object>} - The response from the server. If the voter is valid, the response will contain a status code of 200 and a JSON object with the voter details. If the voter is invalid, the response will contain a status code of 404.
 */
export const verifyVoter = async (voterData) => {
  const response = await axios.post(`/api/voters/verify`, voterData);
  return response.data;
};
