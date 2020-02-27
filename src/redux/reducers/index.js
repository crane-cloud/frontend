import { combineReducers } from 'redux';
import ClustersReducer from '../reducers/clustersReducer';
import AddClusterReducer from '../reducers/addClusterReducer';
import user from '../reducers/user';


export default combineReducers({
  ClustersReducer,
  user,
  AddClusterReducer
});