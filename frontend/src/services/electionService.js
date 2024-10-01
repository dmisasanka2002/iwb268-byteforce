import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;
export const createElection = async (electionData) => {
  const response = await axios.post(`${backURL}/api/election/create`, {
    name: electionData.title,
    startDate: electionData.startTime,
    endDate: electionData.endTime,
  });
  return response.data;
};

export const addCandidate = async (candidateData) => {
  console.log(candidateData);

  const response = await axios.post(
    `${backURL}/api/addCandidate`,
    candidateData
  );
  return response.data;
};

export const addVoter = async (voterData) => {
  const response = await axios.post(`${backURL}/api/voters`, voterData);
  return response.data;
};

export const getElectionResults = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/elections/${electionId}/results`
  );
  return response.data;
};

export const getCandidates = async (electionId) => {
  try {
    const response = await axios.get(`/api/elections/${electionId}/candidates`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getVoters = async (electionId) => {};

export const updateCandidate = async (candidateId, updatedData) => {
  try {
    const response = await axios.put(
      `/api/candidates/${candidateId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
