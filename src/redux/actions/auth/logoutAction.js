import store from '../../../store';
import * as ACTIONTYPES from '../actionTypes';

const logOutAction = () => {
  store.dispatch({
    type: ACTIONTYPES.LOGOUT
  });
};

export default logOutAction;
