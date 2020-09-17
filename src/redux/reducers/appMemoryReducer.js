import {
    FETCH_APP_MEMORY_SUCCESS,
    FETCH_APP_MEMORY_FAILED,
    IS_FETCHING_APP_MEMORY,
    CLEAR_APP_MEMORY
} from '../actions/actionTypes';

const initialState = {
    metrics: [],
    isFetching: false,
    message: ''
};

const appMemoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APP_MEMORY_SUCCESS:
            return {
                ...state,
                metrics: [...state.metrics,
                        {
                            app: action.payload.app,
                            metrics: action.payload.metrics
                        }
                    ],
                    isFetching: false,
                    message: 'Fetched app memory metrics'
            };

        case FETCH_APP_MEMORY_FAILED:
            return {
                ...state,
                metrics: [...state.metrics,
                        {
                            app: action.payload.app,
                            metrics: action.payload.metrics
                        }
                    ],
                    isFetching: false,
                    message: 'Error fetching app memory metrics'
            };

        case IS_FETCHING_APP_MEMORY:
            return {
                ...state,
                isFetching: true,
            };

        case CLEAR_APP_MEMORY:
            return {
                ...state,
                metrics: [],
                    isFetching: false,
                    message: ''
            };

        default:
            return state;
    }
};
export default appMemoryReducer;