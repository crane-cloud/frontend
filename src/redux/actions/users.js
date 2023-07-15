import axios from "../../axios";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  START_GETTING_USERS,
} from "./actionTypes";

import LRU  from "lru-cache";
const cache = new LRU({
  max: 50, 
  ttl: 60 * 60 * 1000, 
});

let currentCacheKey = null;


export const startGettingUsers = () => ({
  type: START_GETTING_USERS,
});

export const getUsersSuccess = (response) => ({
  type: GET_USERS_SUCCESS,
  payload: response.data.data,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUsersList = (page,keyword='') => async (dispatch) => {
  dispatch(startGettingUsers());
  // try {
  //   const response = await axios.get(`/users?page=${page}`);
  //   return dispatch(getUsersSuccess(response));
  // } catch (error) {
  //   dispatch(getUsersFail(error));
  // }

  const cacheKey = `${page}_${keyword}`;
  currentCacheKey=cacheKey;

  // Check if the data is already cached
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    dispatch(getUsersSuccess(cachedResponse));
    return Promise.resolve();
  }

  let link;
  if (keyword) {
    link = `/users?page=${page}&keywords=${keyword}`;
  } else {
    link = `/users?page=${page}`;
  }
  
  // Run the API call in the background to fetch updated data
  const backgroundRequest = axios.get(link).then((response) => {
    cache.set(cacheKey, response); // Update the cache with new data
    //prevents background search from affecting the new search
    if(cacheKey === currentCacheKey){
    dispatch(getUsersSuccess(response));
    }
  });

  // Check if there's an existing cache, but don't wait for the background request to finish
  if (cachedResponse) {
    return Promise.resolve();
  }

  // Return the background request as a promise
  return backgroundRequest.catch((error) => {
    dispatch(getUsersFail(error));
  });

};

export default getUsersList;
