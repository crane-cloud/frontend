import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getPodsList from '../../redux/actions/podsActions';
import tellTime from '../../helpers/ageUtility';
import './PodsList.css';


class PodsList extends Component {
  componentDidMount() {
    const { getPodsList } = this.props;
    getPodsList();
  }

  getAge(utcDate) {
    const creationTimestamp = new Date(utcDate).getTime();
    return creationTimestamp;
  }

  podStatuses(containerlist) {
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
    return (
      <div className="ClusterList">
        <table className="Pods table">
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
                  <td>{this.podStatuses(pod.status.containerStatuses)}</td>
                  <td>{pod.status.phase}</td>
                  <td>{tellTime(pod.metadata.creationTimestamp)}</td>
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
