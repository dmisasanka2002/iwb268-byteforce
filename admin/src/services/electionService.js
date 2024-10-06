import axios from "axios";

const backURL = import.meta.env.VITE_BACKENDURL;
export const createElection = async (electionData) => {
  console.log({
    name: electionData.title,
    startTime: new Date(electionData.startTime),
    endTime: new Date(electionData.endTime),
  });

  const response = await axios.post(`${backURL}/api/election/create`, {
    name: electionData.title,
    startTime: new Date(electionData.startTime),
    endTime: new Date(electionData.endTime),
  });
  return response.data;
};

export const uploadFile = async (file, fileType, electionId) => {
  const responce = await axios.post(
    `${backURL}/api/upload/file/${fileType.toUpperCase()}/${electionId}`,
    file
  );

  return responce.data;
};

export const getElectionList = async () => {
  const response = await axios.get(`${backURL}/api/election/list`);
  console.log(response);

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
  const response = await axios.post(`${backURL}/api/addVoter`, voterData);
  return response.data;
};

export const getElectionResults = async (electionId) => {
  // const response = await axios.get(`${backURL}/api/finalResult/${electionId}`);
  const response = await axios.get(
    `${backURL}/api/candidates/list/${electionId}`
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

export const getVoters = async (electionId) => {
  // console.log(electionId);
  try {
    const response = await axios.get(
      `${backURL}/api/voters/list/${electionId}`
    );
    // console.log(response);

    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

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
