import { FETCH_PERSISTENT_VOLUMES } from '../../actions/actionTypes';

const initialState = {
  persistentVolumes: []
};

const fetchPersistentVolumes = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PERSISTENT_VOLUMES:
    return {
      ...state,
      persistentVolumes: action.payload
    };

  default:
    return state;
  }
};

export default fetchPersistentVolumes;
