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
        message: false
      };

      case ACTIONTYPES.LOGOUT:
        /** disable session here */
        return {
          ...state,
          loggedIn: false,
          accessToken: "",
        };

        case ACTIONTYPES.LOGIN_FAILURE:
          return {
            ...state,
            loginFailureMessage: action.loginFailureMessage
          };

        case ACTIONTYPES.REGISTRATION_FAILURE:
          return {
            ...state,
            registrationFailureMessage: action.registrationFailureMessage
          };

    default:
      return state;
  }
};

export default auth;
