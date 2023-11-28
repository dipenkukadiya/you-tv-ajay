import { AxiosResponse } from "axios";
import axios from "./axios";

// import types
import { IVideoDetail, IUploader } from "@/types/video";

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

export const getVideoData = async (videId: string): Promise<IVideoDetail | null> => {
  const axiosCall = await axios.get(`/streams/${videId}`);
  const response = await makeRequest(axiosCall, false);
  if (!!response) {
    if (response.status === 200) {
      const videoData = response.data;

      const uploader: IUploader = {
        name: videoData.uploader,
        url: videoData.uploaderUrl,
        avatar: videoData.uploaderAvatar,
        isVerified: videoData.uploaderVerified,
        subscriberCount: videoData.uploaderSubscriberCount,
      }
      videoData.uploader = uploader;
      return videoData;
    }
  }
  return null;
}