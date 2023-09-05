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

const getAdminProjectsList = (page , keyword, state='') => async (dispatch) => {
  dispatch(startTheFetch());
  let url
  if(state){
   url = `/projects?keywords=${keyword}&page=${page}&disabled=${state}`
  }else{
   url =  `/projects?page=${page}&keywords=${keyword}`
  }

  try {
    const response = await axios.get(
    url
    );
    return dispatch(getAdminProjectsSuccess(response));
  } catch (error) {
    dispatch(getAdminProjectsFailed(error));
  }
};

export default getAdminProjectsList;
