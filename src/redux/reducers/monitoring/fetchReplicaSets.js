import { FETCH_REPLICA_SETS } from "../../actions/actionTypes";

const initialState = {
    replicaSetsArray: []
}

const fetchReplicaSets = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPLICA_SETS:
            return {
                ...state,
                replicaSetsArray: action.payload
            };

        default:
            return state;

    }
}

export default fetchReplicaSets;