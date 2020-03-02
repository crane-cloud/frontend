import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getPodsList from '../../redux/actions/podsActions';
import tellAge from '../../helpers/ageUtility';
import './PodsList.css';
import NavBar from '../NavBar';
import Status from '../Status';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class PodsList extends Component {
  componentDidMount() {
    const { getPodsList } = this.props;
    const { match: { params } } = this.props;
    getPodsList(params.clusterID);
  }

  getAge(utcDate) {
    const creationTimestamp = new Date(utcDate).getTime();
    return creationTimestamp;
  }

  podStatus(conditions) {
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

  podReady(containerlist) {
    if (typeof (containerlist) !== 'undefined') {
      const count = containerlist.length;
      let ready = 0;
      containerlist.map(
        (container) => {
          if (container.ready) {
            ready += 1;
          }
          return 0;
        }
      );
      return `${ready}/${count}`;
    }
    return 0;
  }

  render() {
    const { pods, isFetched, isRetrieving } = this.props;
    const { clusterName } = this.props;
    return (

      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Pods" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="ClusterList">
                <table className="PodsTable">
                  <tr>
                    <th>Name</th>
                    <th>Ready</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                  {
                    isRetrieving ? (
                      <div>Fetching Pods</div>
                    ) : (
                      isFetched ? (pods.pods.map((pod) => (
                        <tr>
                          <td>{pod.metadata.name}</td>
                          <td>{this.podReady(pod.status.containerStatuses)}</td>
                          {/* <td>{this.podStatus(pod.status.conditions)}</td> */}
                          {/* {console.log(this.podStatus(pod.status.conditions))} */}
                          <td><Status status={this.podStatus(pod.status.conditions)} /></td>
                          <td>{tellAge(pod.metadata.creationTimestamp)}</td>
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
      </div>

    );
  }
}

// inititate props
PodsList.propTypes = {
  pods: PropTypes.object,
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getPodsList: PropTypes.func
};

// assigning defaults
PodsList.defaultProps = {
  pods: [],
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, pods, isFetched } = state.podsReducer;
  return { isRetrieving, pods, isFetched };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPodsList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodsList);
