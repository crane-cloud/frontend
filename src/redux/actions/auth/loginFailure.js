import store from '../../../store';
import * as ACTIONTYPES from '../actionTypes'

const loginFailure = ({message}) => {
    store.dispatch({
        type: ACTIONTYPES.LOGIN_FAILURE,
        loginFailureMessage: message
    });
};

export default loginFailure;