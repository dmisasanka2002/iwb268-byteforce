import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;

export const verifyVoterNIC = async (voterNIC) => {
  const response = await axios.get(
    `${backURL}/api/voter/verify/nic/${voterNIC}`
  );
  return response;
};

export const verifyVoterEmail = async (voterData) => {
  const response = await axios.post(
    `${backURL}/api/voter/verify/credential`,
    voterData
  );
  console.log(response);
  return response;
};
