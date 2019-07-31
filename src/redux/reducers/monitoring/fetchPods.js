import {
    FETCH_PODS_RUNNING,
    FETCH_PODS_PENDING,
    FETCH_PODS_SUCCESS,
    FETCH_PODS_FAILED
} from '../../actions/actionTypes';

const initialState = {
    podsRunning: "",
    podsPending: "",
    podsSucceding: "",
    podsFailing: ""
}

const fetchPods = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PODS_RUNNING:
            return {
                ...state,
                podsRunning: action.payload
            };

        case FETCH_PODS_PENDING:
            return {
                ...state,
                podsPending: action.payload
            };

        case FETCH_PODS_SUCCESS:
            return {
                ...state,
                podsSuccess: action.payload
            };

        case FETCH_PODS_FAILED:
            return {
                ...state,
                podsFailed: action.payload
            };

        default:
            return state;

    }
}

export default fetchPods;

