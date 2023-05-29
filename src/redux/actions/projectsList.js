import axios from "../../axios";

import {
  IS_FETCHING,
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILED,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getUserProjectsSuccess = (response) => ({
  type: FETCH_USER_PROJECTS_SUCCESS,
  payload: response.data.data,
});

export const getUserProjectsFailed = (error) => ({
  type: FETCH_USER_PROJECTS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserProjects = (page,keyword="") => (dispatch) => {
  dispatch(startTheFetch());
  let link;
  if(keyword){
    link = `/projects?page=${page}&keywords=${keyword}`;
  }else{
    link = `/projects?page=${page}`;
  }
  return axios
    .get(link)
    .then((response) => dispatch(getUserProjectsSuccess(response)))
    .catch((error) => {
      dispatch(getUserProjectsFailed(error));
    });
};

export default getUserProjects;
