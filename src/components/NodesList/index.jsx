import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getNodesList from '../../redux/actions/nodeClusterActions';
import tellAge from '../../helpers/ageUtility';
import './NodesList.css';
import NavBar from '../NavBar';
import Status from '../Status';
import SpinnerComponents from '../SpinnerComponent';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class NodesList extends Component {
  componentDidMount() {
    const { getNodesList } = this.props;
    const { match: { params } } = this.props;
    getNodesList(params.clusterID);
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

  nodeStatus(conditions) {
    let status = '';
    conditions.map((condition) => {
      if (condition.type === 'Ready') {
        status = condition.status;
      }
      return null;
    });
    if (status === 'True') {
      return true;
    }
    return false;
  }


  render() {
    const { nodes, isFetched, isRetrieving } = this.props;
    const clusterName = localStorage.getItem('clusterName');

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Nodes" showBtn={false} />
            </div>
            <div className="LowerBar" />

            <div className="ResourcesTable">
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
                    <div className="CenterSpinner"><SpinnerComponents /></div>) : (
                    isFetched ? (nodes.nodes.map((node) => (
                      <tr>
                        <td>{node.metadata.name}</td>
                        <td><Status status={this.nodeStatus(node.status.conditions)} /></td>
                        <td>{ this.getRoles(node) }</td>
                        <td>{tellAge(node.metadata.creationTimestamp)}</td>
                        <td>{node.status.nodeInfo.kubeProxyVersion}</td>
                      </tr>
                    ))) : (
                      <h3 className="EmptyList">No Pods Available</h3>
                    )
                  )
                }
              </table>
            </div>
          </div>
        </div>
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
