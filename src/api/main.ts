import { AxiosResponse } from "axios";
import axios from "./axios";

const makeRequest = async (call: AxiosResponse<any, any>, throwError: boolean = false) => {
  try {
    const response = await call;
    return response;
  } catch (e) {
    if (throwError) {
      throw e;
    } else {
      console.error("Error when awaiting API promise. Error: ", e);
    }
  }
  return null;
}

export const getVideoData = async (videId: string) => {
  const axiosCall = await axios.get(`/streams/${videId}`);
  const response = await makeRequest(axiosCall, false);
  if (!!response) {
    if (response.status === 200) {
      return response.data;
    }
  }
  return null;
}