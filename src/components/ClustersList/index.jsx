import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getClustersList from '../../redux/actions/ClustersActions';
import ClusterCard from '../ClusterCard';
import './ClustersList.css';
import crane from '../../assets/images/craneLogo.png';


class ClustersList extends Component {
  componentDidMount() {
    const { getClustersList } = this.props;
    getClustersList();
  }

  render() {
    const { clusters } = this.props;

    return (
      <div className="ClusterList">
        {clusters !== 0 ? (clusters.clusters.map((cluster) => (
          <Link to={{ pathname: `/clusters/${cluster.id}/resources` }} key={cluster.id}>
            <div key={cluster.id} className="ClusterCardItem">
              <ClusterCard name={cluster.name} description={cluster.host} icon={crane} />
            </div>
          </Link>
        ))) : (
          <h3 className="EmptyList">No Clusters Available</h3>
        )}
      </div>
    );
  }
}

// inititate props
ClustersList.propTypes = {
  clusters: PropTypes.object,
  isRetrieving: PropTypes.bool
};

// assigning defaults
ClustersList.defaultProps = {
  clusters: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, clusters } = state.ClustersReducer;
  return { isRetrieving, clusters };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClustersList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClustersList);
