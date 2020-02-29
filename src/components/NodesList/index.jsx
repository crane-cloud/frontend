import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getNodesList from '../../redux/actions/nodeClusterActions';
// import tellTime from '../../helpers/ageUtility';
import './NodesList.css';


class NodesList extends Component {
  componentDidMount() {
    const { getNodesList } = this.props;
    getNodesList();
  }

  getAge(utcDate) {
    const creationTimestamp = new Date(utcDate).getTime();
    return creationTimestamp;
  }

  getRoles(node) {
    if (typeof (node.spec.taints) !== 'undefined') {
      const str = String(node.spec.taints[0].key);
      // get strings after /
      const role = str.substr(str.indexOf('/') + 1);
      return role;
    }
    return '<none>';
  }


  nodeStatus(condition) {
    if (condition.type === 'Ready') {
      if (condition.status === 'True') {
        return 'Ready';
      }
      return condition.status;
    }
    return null;
  }

  render() {
    const { nodes, isFetched, isRetrieving } = this.props;
    return (
      <div className="ClusterList">
        <table className="Nodes table">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Roles</th>
            <th>Age</th>
            <th>Version</th>
          </tr>
          {
            isRetrieving ? (
              <div>Fetching Nodes</div>
            ) : (
              isFetched ? (nodes.nodes.map((node) => (
                <tr>
                  <td>{node.metadata.name}</td>
                  <td>{node.status.conditions.map(this.nodeStatus)}</td>
                  <td>{ this.getRoles(node) }</td>
                  <td>{node.metadata.creationTimestamp}</td>
                  <td>{node.status.nodeInfo.kubeProxyVersion}</td>
                </tr>
              ))) : (
                <h3 className="EmptyList">No Pods Available</h3>
              )
            )
          }
        </table>

      </div>
    );
  }
}

// inititate props
NodesList.propTypes = {
  nodes: PropTypes.object,
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getNodesList: PropTypes.func
};

// assigning defaults
NodesList.defaultProps = {
  nodes: [],
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, nodes, isFetched } = state.nodesReducer;
  return { isRetrieving, nodes, isFetched };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNodesList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodesList);
