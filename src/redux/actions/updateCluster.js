import axios from "../../axios";
import {
    START_UPDATING_CLUSTER,
    CLEAR_CLUSTER_UPDATE_STATE,
    UPDATE_CLUSTER_SUCCESS,
    UPDATE_CLUSTER_FAILED,
} from "./actionTypes";

const startUpdatingCluster = () => ({
  type: START_UPDATING_CLUSTER,
});

export const updateClusterSuccess = (response) => ({
  type: UPDATE_CLUSTER_SUCCESS,
  payload: response.data,
});

export const updateClusterFail = (error) => ({
  type: UPDATE_CLUSTER_FAILED,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});

const clearUpdateClusterState = () => ({
  type: CLEAR_CLUSTER_UPDATE_STATE,
});

const updateCluster = (clusterID, clusterData) => (dispatch) => {
  dispatch(startUpdatingCluster());

  return axios
    .patch(`/clusters/${clusterID}`, clusterData)
    .then((response) => dispatch(updateClusterSuccess(response)))
    .catch((error) => {
      dispatch(updateClusterFail(error));
    });
};
export { clearUpdateClusterState };

export default updateCluster;
