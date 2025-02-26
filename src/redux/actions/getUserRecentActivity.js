import {userActivityLoggerAxios} from "../../axios";
import {
  GETTING_USER_RECENT_ACTIVITIES,
  USER_RECENT_ACTIVITIES_SUCCESS,
  USER_RECENT_ACTIVITIES_FAIL,
} from "./actionTypes";

const startFetchingUserRecentActivities = () => ({
  type: GETTING_USER_RECENT_ACTIVITIES,
});

const userRecentActivitiesSuccess = (response) => ({
  type: USER_RECENT_ACTIVITIES_SUCCESS,
  payload: response.data,
});

const userRecentActivitiesFailed = (error) => ({
  type: USER_RECENT_ACTIVITIES_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserRecentActivities = (userID, currentPage, pageSize=10) => async (dispatch) => {
  dispatch(startFetchingUserRecentActivities());

  let link;
  if (userID !== "") {
    link = `/activities?a_user_id=${userID}&page=${currentPage}&per_page=${pageSize}&general=true`;
  } else {
    link = `/activities&general=true`;
  }
  try {
    const response = await userActivityLoggerAxios.get(link);
    dispatch(userRecentActivitiesSuccess(response.data));
  } catch (error) {
    dispatch(userRecentActivitiesFailed(error));
  }
};

export default getUserRecentActivities;
