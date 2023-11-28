import axios from 'axios';
import APP_CONFIG from '@/constants/config';

export const URI = APP_CONFIG.API_URL + APP_CONFIG.API_SUFFIX;
const service = axios.create({
  baseURL: URI,
  timeout: APP_CONFIG.API_TIMEOUT,
});


console.log("This is uri: ", APP_CONFIG);
// request interceptor
service.interceptors.request.use(
  (config: any) => {

    // Add abort controller
    let axiosCall = axios.CancelToken.source();
    config.cancelToken = axiosCall.token;

    if (APP_CONFIG.ENV) {
      // Add timestamp
      config.startTime = Date.now();
    }
    return config;
  },
  (error: any) => {
    // do something with request error
    if (APP_CONFIG.ENV) console.log('Axios Error:', error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: any) => {
    if (APP_CONFIG.ENV) {
      const endTime = Date.now();
      console.log(
        'Request completed in: ',
        endTime - response.config.startTime,
        ' ms',
      );
      console;
    }
    return response;
  },
);

export default service;