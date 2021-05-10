import {
  START_GETTING_STORAGE_CLASS,
  GET_STORAGE_CLASS_FAIL,
  GET_STORAGE_CLASS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  storageClasses: {},
  isRetrieving: false,
  isFetched: false,
  message: "Storage Classes Not Available",
};

const storageClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STORAGE_CLASS_SUCCESS:
      return {
        ...state,
        storageClasses: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "All Storage Classes fetched",
      };

    case START_GETTING_STORAGE_CLASS:
      return {
        ...state,
        isFetched: false,
        isRetrieving: true,
      };

    case GET_STORAGE_CLASS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false,
      };

    default:
      return state;
  }
};
export default storageClassesReducer;
