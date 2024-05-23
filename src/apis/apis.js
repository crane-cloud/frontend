import axios,{userActivityLoggerAxios} from "../axios";


export const handlePostRequestWithDataObject = (
  data,
  endpoint,
  axiosInstance = axios
) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(endpoint, {
        data,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const handlePostRequestWithOutDataObject = (
  data,
  endpoint,
  axiosInstance = axios
) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(endpoint, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleGetRequest = (endpoint, axiosInstance = axios) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(endpoint)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handlePatchRequest = (endpoint, data, axiosInstance = axios) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .patch(endpoint, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const handleDeleteRequest = (endpoint, data, axiosInstance = axios) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(endpoint, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
