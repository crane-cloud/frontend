import store from '../../../store';
import * as ACTIONTYPES from '../actionTypes';

const logOutAction = () => {
  sessionStorage.removeItem('creds')
  store.dispatch({
    
    type: ACTIONTYPES.LOGOUT

  });
};

export default logOutAction;
