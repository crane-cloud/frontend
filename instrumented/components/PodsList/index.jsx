import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getPodsList from "../../redux/actions/pods";
import tellAge from "../../helpers/ageUtility";
import Header from "../Header";
import Status from "../Status";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import ProgressBar from "../ProgressBar";

class PodsList extends Component {
  constructor(props) {
    super(props);

    this.calculatePercentage = this.calculatePercentage.bind(this);
    this.displayFraction = this.displayFraction.bind(this);
  }

  componentDidMount() {
    const { getPodsList } = this.props;
    const {
      match: { params },
    } = this.props;
    getPodsList(params.clusterID);
  }

  podStatus(conditions) {
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

  calculatePercentage(proportion, total) {
    return Math.round((proportion / total) * 100);
  }

  displayFraction(numerator, denominator) {
    return `${numerator}/${denominator}`;
  }

  podReady(containerlist) {
    if (typeof containerlist !== "undefined") {
      const count = containerlist.length;
      let ready = 0;
      containerlist.map((container) => {
        if (container.ready) {
          ready += 1;
        }
        return 0;
      });
      return (
        <ProgressBar
          percentage={this.calculatePercentage(ready, count)}
          fractionLabel={this.displayFraction(ready, count)}
        />
      );
    }
    return (
      <ProgressBar
        percentage={this.calculatePercentage(0, 0)}
        fractionLabel={this.displayFraction(0, 0)}
      />
    );
  }

  render() {
    const { pods, isFetched, isRetrieving } = this.props;
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
              <InformationBar header="Pods" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? "ResourcesTable LoadingResourcesTable"
                    : "ResourcesTable"
                }
              >
                <table className="PodsTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ready</th>
                      <th>Status</th>
                      <th>Age</th>
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
                        pods.pods !== undefined &&
                        pods.pods.map((pod) => (
                          <tr key={pods.pods.indexOf(pod)}>
                            <td>{pod.metadata.name}</td>
                            <td>
                              {this.podReady(pod.status.containerStatuses)}
                            </td>
                            <td>
                              <Status
                                status={this.podStatus(pod.status.conditions)}
                              />
                            </td>
                            <td>{tellAge(pod.metadata.creationTimestamp)}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>
                {isFetched && pods.pods.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Pods Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>Oops! Something went wrong! Failed to retrieve Pods.</p>
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
PodsList.propTypes = {
  pods: PropTypes.shape({
    pods: PropTypes.arrayOf(PropTypes.object),
  }),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getPodsList: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string,
    }),
  }),
};

// assigning defaults
PodsList.defaultProps = {
  pods: {},
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, pods, isFetched } = state.podsReducer;
  return { isRetrieving, pods, isFetched };
};

const mapDispatchToProps = {
  getPodsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PodsList);
