import {
  GETTING_USER_RECENT_ACTIVITIES,
  USER_RECENT_ACTIVITIES_SUCCESS,
  USER_RECENT_ACTIVITIES_FAIL,
} from "../actions/actionTypes";

const initialState = {
  recentActivities: [],
  isFetchingRecentActivities: false,
  recentActivitiesFetched: false,
  pagination: {},
  recentActivitiesMessage: "No Recent Activity Found",
};

const userRecentActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        recentActivities: action.payload.activity,
        pagination: action.payload.pagination,
        isFetchingRecentActivities: false,
        recentActivitiesFetched: true,
        recentActivitiesMessage: "Fetched recent activities",
      };

    case GETTING_USER_RECENT_ACTIVITIES:
      return {
        ...state,
        recentActivitiesFetched: false,
        isFetchingRecentActivities: true,
      };

    case USER_RECENT_ACTIVITIES_FAIL:
      return {
        ...state,
        isFetchingRecentActivities: false,
        recentActivitiesFetched: false,
        pagination: {},
        recentActivitiesMessage: "Error fetching recent activities",
      };
    default:
      return state;
  }
};
export default userRecentActivitiesReducer;
