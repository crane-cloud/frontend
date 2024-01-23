import axios from "../../axios";
import {
  FETCH_APP_REVISIONS_SUCCESS,
  FETCH_APP_REVISIONS_FAILED,
  IS_FETCHING_APP_REVISIONS,
  CLEAR_FETCH_APP_REVISIONS,
} from "./actionTypes";

export const startFetchingAppRevisions = () => ({
  type: IS_FETCHING_APP_REVISIONS,
});

const getAppRevisionsSuccess = (response) => ({
  type: FETCH_APP_REVISIONS_SUCCESS,
  payload: response.data.data,
});

const getAppRevisionsFailed = (error) => ({
  type: FETCH_APP_REVISIONS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearFetchAppRevisionsState = () => ({
  type: CLEAR_FETCH_APP_REVISIONS,
});

const getAppRevisions = (appID, currentPage) => (dispatch) => {
  dispatch(startFetchingAppRevisions());

  let link;

  if (currentPage) {
    link = `/apps/${appID}/revisions?page=${currentPage}`;
  } else {
    link = `/apps/${appID}/revisions`;
  }

  return axios
    .get(link)
    .then((response) => {
      dispatch(getAppRevisionsSuccess(response));
    })
    .catch((error) => {
      dispatch(getAppRevisionsFailed(error));
    });
};

export { clearFetchAppRevisionsState };

export default getAppRevisions;
