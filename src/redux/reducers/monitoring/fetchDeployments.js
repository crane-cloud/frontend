import { FETCH_DEPLOYMENTS } from "../../actions/actionTypes";

const initialState = {
    deploymentsArray: []   
}

const fetchDeployments = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPLOYMENTS:
            return {
                ...state,
                deploymentsArray: action.payload
            };

            default:
            return state;

    }
}

export default fetchDeployments;