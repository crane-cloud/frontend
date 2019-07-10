import * as ACTIONTYPES from '../actions/actionTypes'

const initialState = {
    loggedIn: false
};

const loginSuccess = (state=initialState, action) => {
    switch (action.type) {
        case ACTIONTYPES.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                accessToken: action.payload.accessToken,
                user: action.payload.user
            }
        default:
            return state
    }
};

export default loginSuccess;