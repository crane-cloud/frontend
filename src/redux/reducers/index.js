import { combineReducers } from 'redux';
import ClustersReducer from '../reducers/clustersReducer';
import user from '../reducers/user';


export default combineReducers({
  ClustersReducer,
  user
});