import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getNodesList from "../../redux/actions/nodeCluster";
import tellAge from "../../helpers/ageUtility";
import "./NodesList.css";
import Header from "../Header";
import Status from "../Status";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";

class NodesList extends Component {
  componentDidMount() {
    const { getNodesList } = this.props;
    const {
      match: { params },
    } = this.props;
    getNodesList(params.clusterID);
  }

  getRoles(node) {
    if (typeof node.spec.taints !== "undefined") {
      const str = String(node.spec.taints[0].key);
      // get strings after /
      const role = str.substr(str.indexOf("/") + 1);
      return role;
    }
    return "<none>";
  }

  nodeStatus(conditions) {
    let status = "";
    conditions.map((condition) => {
      if (condition.type === "Ready") {
        status = condition.status;
      }
      return null;
    });
    if (status === "True") {
      return true;
    }
    return false;
  }

  render() {
    const { nodes, isFetched, isRetrieving } = this.props;
    const clusterName = localStorage.getItem("clusterName");
    const {
      match: { params },
    } = this.props;

    return (
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Nodes" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? "ResourcesTable LoadingResourcesTable"
                    : "ResourcesTable"
                }
              >
                <table className="Nodes table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Roles</th>
                      <th>Age</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  {isRetrieving ? (
                    <tbody>
                      <tr className="TableLoading">
                        <td>
                          <div className="SpinnerWrapper">
                            <Spinner size="big" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {isFetched &&
                        nodes.nodes !== undefined &&
                        nodes.nodes.map((node) => (
                          <tr key={nodes.nodes.indexOf(node)}>
                            <td>{node.metadata.name}</td>
                            <td>
                              <Status
                                status={this.nodeStatus(node.status.conditions)}
                              />
                            </td>
                            <td>{this.getRoles(node)}</td>
                            <td>{tellAge(node.metadata.creationTimestamp)}</td>
                            <td>{node.status.nodeInfo.kubeProxyVersion}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>

                {isFetched && nodes.nodes.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Nodes Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>Oops! Something went wrong! Failed to retrieve Nodes.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// inititate props
NodesList.propTypes = {
  nodes: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.object),
  }),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getNodesList: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string,
    }),
  }),
};

// assigning defaults
NodesList.defaultProps = {
  nodes: {},
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, nodes, isFetched } = state.nodesReducer;
  return { isRetrieving, nodes, isFetched };
};

const mapDispatchToProps = {
  getNodesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodesList);
