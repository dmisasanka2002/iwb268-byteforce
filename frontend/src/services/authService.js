import axios from "axios";

export const verifyVoter = async (voterData) => {
  const response = await axios.post(`/api/voters/verify`, voterData);
  return response.data;
};
