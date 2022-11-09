import {
  GET_PROJECT_MEMBERS_SUCCESS,
  GET_PROJECT_MEMBERS_FAILED,
  START_GETTING_PROJECT_MEMBERS,
} from "../actions/actionTypes";

const initialState = {
    projectMembers: [],
    isFetched: false,
    isFetching: false,
    message: "No project members found.",
};

const projectMembersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROJECT_MEMBERS_SUCCESS:
            return{
                ...state,
                projectMembers: action.payload,
                isFetching: false,
                isFetched: true,
                message: "Project members successfully fetched",
            };
        
        case START_GETTING_PROJECT_MEMBERS:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
            };
        
        case GET_PROJECT_MEMBERS_FAILED:
            return {
                ...state,
                message: action.payload,
                isFetching: false,
                isFetched: false,
            };

        default:
            return state;
    }
};

export default projectMembersReducer;