import store from '../../store';
import * as ACTIONTYPES from './actionTypes'

const loginSuccess = (data) => {
    store.dispatch({
        type: ACTIONTYPES.LOGIN_SUCCESS,
        payload: data
    });
};

export default loginSuccess;