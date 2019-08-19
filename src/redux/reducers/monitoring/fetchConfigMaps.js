import { FETCH_CONFIG_MAPS } from "../../actions/actionTypes";

const initialState = {
    configMapsArray: []
}

const fetchConfigMaps = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONFIG_MAPS:
            return {
                ...state,
                configMapsArray: action.payload
            };

            default:
            return state;

    }
}

export default fetchConfigMaps;