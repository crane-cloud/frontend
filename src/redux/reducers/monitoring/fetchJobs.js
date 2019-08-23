import { FETCH_JOBS_FAILED, FETCH_JOBS_SUCCESS } from '../../actions/actionTypes';

const initialState = {
    jobsSucceeded: "",
    jobsFailed: ""
}

const fetchJobs = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOBS_FAILED:
            return {
                ...state,
                jobsFailed: action.payload
            };

        case FETCH_JOBS_SUCCESS:
            return {
                ...state,
                jobsSucceeded: action.payload
            };

        default:
            return state;

    }
}

export default fetchJobs;

