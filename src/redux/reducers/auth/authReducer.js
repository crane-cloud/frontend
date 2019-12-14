import * as ACTIONTYPES from '../../actions/actionTypes';

const initialState = {
  loggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONTYPES.LOGIN_SUCCESS:
    /* set user session here */
    sessionStorage.setItem('creds', action.payload.accessToken);
    return {
      ...state,
      loggedIn: true,
      accessToken: action.payload.accessToken,
      message: false
    };

  case ACTIONTYPES.LOGOUT:
    /** disable session here */
    sessionStorage.removeItem('creds');
    return {
      ...state,
      loggedIn: false,
      accessToken: '',
    };

  default:
    return state;
  }
};

export default auth;
