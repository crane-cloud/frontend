import {
  GETTING_USER_ACTIVITIES,
  USER_ACTIVITIES_SUCCESS,
  USER_ACTIVITIES_FAIL,
} from "../actions/actionTypes";

const initialState = {
  activities: [],
  isFetchingActivities: false,
  activitiesFetched: false,
  pagination: {},
  activitiesMessage: "Activities Not Available",
};

const userActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload.activity,
        pagination: action.payload.pagination,
        isFetchingActivities: false,
        activitiesFetched: true,
        activitiesMessage: "Fetched activities",
      };

    case GETTING_USER_ACTIVITIES:
      return {
        ...state,
        activitiesFetched: false,
        isFetchingActivities: true,
      };

    case USER_ACTIVITIES_FAIL:
      return {
        ...state,
        isFetchingActivities: false,
        activitiesFetched: false,
        pagination: {},
        activitiesMessage: "Error fetching activities",
      };
    default:
      return state;
  }
};
export default userActivitiesReducer;
