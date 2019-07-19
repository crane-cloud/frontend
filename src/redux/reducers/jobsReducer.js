import { FETCH_JOBS_FAILED, FETCH_JOBS_SUCCEEDED } from '../actions/actionTypes';

const initialState = {
    jobsSucceeded: "",
    jobsFailed: ""
}

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOBS_FAILED:
            return {
                ...state,
                jobsFailed: action.payload
            };

        case FETCH_JOBS_SUCCEEDED:
            return {
                ...state,
                jobsSucceeded: action.payload
            };

        default:
            return state;

    }
}

export default jobsReducer;

