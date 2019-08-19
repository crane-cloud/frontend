import { FETCH_PV_CLAIMS } from "../../actions/actionTypes";

const initialState = {
    pvClaims: []   
}

const fetchpvClaims = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PV_CLAIMS:
            return {
                ...state,
                pvClaims: action.payload
            };

            default:
            return state;

    }
}

export default fetchpvClaims;