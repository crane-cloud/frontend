import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getPodsList from '../../../redux/actions/podsActions';
import './PodsList.css';


class PodsList extends Component {
  componentDidMount() {
    const { getPodsList } = this.props;
    getPodsList();
  }

  render() {
    const { pods, isFetched } = this.props;
    console.log(pods);
    return (
      <div className="ClusterList">
        {isFetched ? (pods.pods.map((pod) => (
          <div>{ pod.name }</div>
        ))) : (
          <h3 className="EmptyList">No Pods Available</h3>
        )}
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
  const { isRetrieving, pods, isFetched } = state.ClustersReducer;
  return { isRetrieving, pods, isFetched };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPodsList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodsList);
