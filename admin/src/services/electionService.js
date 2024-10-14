import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;
export const createElection = async (electionData) => {
  const response = await axios.post(`${backURL}/api/election/create`, {
    name: electionData.title,
    startTime: new Date(electionData.startTime),
    endTime: new Date(electionData.endTime),
  });

  return response.data;
};

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

export const getElectionList = async () => {
  const response = await axios.get(`${backURL}/api/election/list`);

  return response.data;
};

export const addCandidate = async (candidateData) => {
  const response = await axios.post(
    `${backURL}/api/addCandidate`,
    candidateData
  );

  return response.data;
};

export const addVoter = async (voterData) => {
  try {
    const response = await axios.post(`${backURL}/api/addVoter`, voterData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getElectionResults = async (electionId) => {
  // const response = await axios.get(`${backURL}/api/finalResult/${electionId}`);
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
  );

  return response.data;
};

export const getAssignedVoters = async (electionId) => {
  const response = await axios.get(
    `${backURL}/api/elections/${electionId}/assigned_voters`
  );
  const data = await response.data;
  return data; // Assuming the API returns this field
};

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
