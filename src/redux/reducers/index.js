import { combineReducers } from 'redux';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';

export default combineReducers({
  ClusterResourcesReducer,
  user

});
