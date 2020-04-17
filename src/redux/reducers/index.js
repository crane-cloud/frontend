import { combineReducers } from 'redux';
import clustersReducer from './clusters';
import addCluster from './addCluster';
import user from './user';
import clusterResourcesReducer from './clusterResources';
import servicesReducer from './services';
import pvsReducer from './pvs';
import nodesReducer from './nodes';
import pvcsReducer from './pvcs';
import namespacesListReducer from './namespacesList';
import podsReducer from './pods';
import storageClassesReducer from './storageClass';
import jobsReducer from './jobs';
import getDeployments from './getDeployments';
import adminProjectsReducer from './adminProjects';
import appsListReducer from './appsList';
import userProjectsReducer from './userProjects';
import addProject from './addProject';
import createAppReducer from './createApp';
import deleteAppReducer from './deleteApp';
import userDetailReducer from './userDetails';
import usersListReducer from './usersList';


export default combineReducers({
  clusterResourcesReducer,
  clustersReducer,
  user,
  addCluster,
  servicesReducer,
  storageClassesReducer,
  pvsReducer,
  nodesReducer,
  pvcsReducer,
  namespacesListReducer,
  podsReducer,
  deployments: getDeployments,
  jobsReducer,
  adminProjectsReducer,
  appsListReducer,
  userProjectsReducer,
  addProject,
  createNewApp: createAppReducer,
  deleteAppReducer,
  userDetailReducer,
  usersListReducer,
});
