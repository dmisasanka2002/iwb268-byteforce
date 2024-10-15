import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

/**
 * Verify a voter by their NIC number.
 *
 * @param {string} voterNIC The NIC number of the voter.
 *
 * @returns {Promise<Object>} The response from the server. If the NIC is valid, the response will contain a status code of 200 and a JSON object with the voter details. If the NIC is invalid, the response will contain a status code of 404.
 */
export const verifyVoterNIC = async (voterNIC) => {
  try {
    const response = await axios.post(
      `${backURL}/api/voter/verify/nic/${voterNIC}`
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Verify a voter by their email address and NIC number.
 *
 * @param {Object} voterData An object containing the voter's email address and NIC number.
 *
 * @returns {Promise<Object>} The response from the server. If the NIC is valid, the response will contain a status code of 200 and a JSON object with the voter details. If the NIC is invalid, the response will contain a status code of 404.
 */
export const verifyVoterEmail = async (voterData) => {
  /**
   * Verify a voter by their email address and NIC number.
   *
   * @param {Object} voterData An object containing the voter's email address and NIC number.
   *
   * @returns {Promise<Object>} The response from the server. If the NIC is valid, the response will contain a status code of 200 and a JSON object with the voter details. If the NIC is invalid, the response will contain a status code of 404.
   */
  try {
    const response = await axios.post(
      `${backURL}/api/voter/verify/credential`,
      voterData
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
