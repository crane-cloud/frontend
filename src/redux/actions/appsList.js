import axios from "../../axios";
import {
  GET_APPS_SUCCESS,
  GET_APPS_FAIL,
  START_GETTING_APPS,
} from "./actionTypes";
//to limit memory
import LRU  from "lru-cache";

const cache = new LRU({
  max: 50, 
  ttl: 60 * 60 * 1000, 
});

let currentCacheKey = null;

export const startFetchingApps = () => ({
  type: START_GETTING_APPS,
});

export const getAppsSuccess = (response) => ({
  type: GET_APPS_SUCCESS,
  payload: response.data.data,
});

export const getAppsFail = (error) => ({
  type: GET_APPS_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

const getAppsList = (projectID, page, per_page, keyword = "") => (
  dispatch
) => {
  dispatch(startFetchingApps());

  const cacheKey = `${projectID}_${page}_${per_page}_${keyword}`;
  currentCacheKey=cacheKey;

  // Check if the data is already cached
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    dispatch(getAppsSuccess(cachedResponse));
    return Promise.resolve();
  }

  let link;
  if (keyword) {
    link = `/projects/${projectID}/apps?per_page=${per_page}&page=${page}&keywords=${keyword}`;
  } else {
    link = `/projects/${projectID}/apps?per_page=${per_page}&page=${page}`;
  }

  // Run the API call in the background to fetch updated data
  const backgroundRequest = axios.get(link).then((response) => {
    cache.set(cacheKey, response); // Update the cache with new data
    //prevents background search from affecting vnew search
    if(cacheKey === currentCacheKey){
    dispatch(getAppsSuccess(response));
    }
  });

  // Check if there's an existing cache, but don't wait for the background request to finish
  if (cachedResponse) {
    return Promise.resolve();
  }

  // Return the background request as a promise
  return backgroundRequest.catch((error) => {
    if (error.response.status === 409) {
      dispatch(getAppsSuccess(error.response));
    } else {
      dispatch(getAppsFail(error));
    }
  });
};

export default getAppsList;
