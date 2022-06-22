import axios from "../../axios";
import {
    GETTING_SINGLE_APP,
    SINGLE_APP_FAIL,
    SINGLE_APP_SUCCESS,
    CLEAR_FETCH_APP
} from "./actionTypes";

export const startTheFetch = () => ({
  type: GETTING_SINGLE_APP,
});

export const getSingleAppSuccess = (response) => ({
  type: SINGLE_APP_SUCCESS,
  payload: response.data.data.apps,
});

export const getSingleAppFailed = (error) => ({
  type: SINGLE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearFetchAppState = () => ({
  type: CLEAR_FETCH_APP,
});

const getSingleApp = (appID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/apps/${appID}`)
    .then((response) => dispatch(getSingleAppSuccess(response)))
    .catch((error) => {
       // accept status codes 200 and  409,
      //409 returns defected apps whose urls have to be regenerated by
      if(error.response.status === 409){
        dispatch(getSingleAppSuccess(error.response)) 
      }else{
        dispatch(getSingleAppFailed(error));
      }
    
    });
};
export { clearFetchAppState };

export default getSingleApp;
