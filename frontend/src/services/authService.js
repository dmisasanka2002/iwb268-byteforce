import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

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

export const verifyVoterEmail = async (voterData) => {
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
