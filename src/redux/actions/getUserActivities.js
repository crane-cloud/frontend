import {userActivityLoggerAxios} from "../../axios";
import {
  GETTING_USER_ACTIVITIES,
  USER_ACTIVITIES_SUCCESS,
  USER_ACTIVITIES_FAIL,
} from "./actionTypes";
import { ACTIVITY_LOGS_API_URL } from "../../config";

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
    link = `/activities?${qeuryParams}&page=${currentPage}`;
  } else {
    link = `/activities?page=${currentPage}`;
  }
  console.log(ACTIVITY_LOGS_API_URL)
  return userActivityLoggerAxios
    .get(link)
    .then((response) => {
      dispatch(userActivitiesSuccess(response));
    })
    .catch((error) => {
      dispatch(userActivitiesFailed(error));
    });
};

export default getUserActivities;
