import {
    FETCH_APP_CPU_SUCCESS,
    FETCH_APP_CPU_FAILED,
    IS_FETCHING_APP_CPU,
    CLEAR_APP_CPU
} from '../actions/actionTypes';

const initialState = {
    metrics: [],
    isFetching: false,
    message: ''
};

const appCpuReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APP_CPU_SUCCESS:
            return {
                ...state,
                metrics: [...state.metrics,
                        {
                            app: action.payload.app,
                            metrics: action.payload.metrics
                        }
                    ],
                    isFetching: false,
                    message: 'Fetched app CPU metrics'
            };

        case FETCH_APP_CPU_FAILED:
            return {
                ...state,
                metrics: [...state.metrics,
                        {
                            app: action.payload.app,
                            metrics: action.payload.metrics
                        }
                    ],
                    isFetching: false,
                    message: 'Error fetching app CPU metrics'
            };

        case IS_FETCHING_APP_CPU:
            return {
                ...state,
                isFetching: true,
            };

        case CLEAR_APP_CPU:
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
export default appCpuReducer;