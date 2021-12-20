import {
  REVERT_FAIL,
  REVERT_SUCCESS,
  REVERTING_URL
} from "../actions/actionTypes";
const initialState = {
  app: [],
  isReverting: false,
  isReverted: false,
  message: "",
};

const revertUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVERT_SUCCESS:
      return {
        ...state,
        app: action.payload,
        isReverting: false,
        isReverted: true,
        message: "App url has been reverted",
      };

    case REVERTING_URL:
      return {
        ...state,
        isReverting: true,
      };

    case REVERT_FAIL:
      return {
        ...state,
        message: action.payload,
        isReverted: false,
        isReverting: false,
      };

    default:
      return state;
  }
};
export default revertUrlReducer;
