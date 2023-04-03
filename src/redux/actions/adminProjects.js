import axios from "../../axios";
import {
  IS_FETCHING,
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getAdminProjectsSuccess = (response) => ({
  type: FETCH_ADMIN_PROJECTS_SUCCESS,
  payload: response.data.data,
});

export const getAdminProjectsFailed = (error) => ({
  type: FETCH_ADMIN_PROJECTS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAdminProjects = (page) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/projects?page=${page}`)
    .then((response) => dispatch(getAdminProjectsSuccess(response)))
    .catch((error) => {
      dispatch(getAdminProjectsFailed(error));
    });
};

export default getAdminProjects;
