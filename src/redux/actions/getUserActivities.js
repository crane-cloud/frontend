import axios from "../../axios";
import {
  GETTING_USER_ACTIVITIES,
  USER_ACTIVITIES_SUCCESS,
  USER_ACTIVITIES_FAIL,
} from "./actionTypes";

const startFetchingUserActivities = () => ({
  type: GETTING_USER_ACTIVITIES,
});

const userActivitiesSuccess = (response) => ({
  type: USER_ACTIVITIES_SUCCESS,
  payload: response.data.data,
});

const userActivitiesFailed = (error) => ({
  type: USER_ACTIVITIES_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserActivities = (qeuryParams, currentPage) => (dispatch) => {
  dispatch(startFetchingUserActivities());

  let link;
  if (qeuryParams !== "" && currentPage !== "") {
    link = `/users/activities?${qeuryParams}&page=${currentPage}`;
  } else {
    link = `/users/activities?page=${currentPage}`;
  }

  return axios
    .get(link)
    .then((response) => {
      dispatch(userActivitiesSuccess(response));
    })
    .catch((error) => {
      dispatch(userActivitiesFailed(error));
    });
};

export default getUserActivities;
