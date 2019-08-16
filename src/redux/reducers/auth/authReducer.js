import * as ACTIONTYPES from '../../actions/actionTypes';

const initialState = {
  loggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONTYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        accessToken: action.payload.accessToken,
      };

      case ACTIONTYPES.LOGOUT:
        /** disable session here */
        return {
          ...state,
          loggedIn: false,
          accessToken: "",
        };

    default:
      return state;
  }
};

export default auth;
