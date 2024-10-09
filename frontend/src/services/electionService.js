import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;
export const getElectionList = async () => {
  const response = await axios.get(`${backURL}/api/election/list`);
  // console.log(response);

  return response.data;
};

export const getElegibleElectionList = async (voterNIC) => {
  const response = await axios.get(
    `${backURL}/api/election/eligible/list/${voterNIC}`
  );
  // console.log(response);

  return response.data;
};

export const getCandidates = async (electionId) => {
  // console.log(electionId);
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
