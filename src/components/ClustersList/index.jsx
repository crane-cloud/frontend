import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getClustersList from '../../redux/actions/ClustersActions';
import ClusterCard from '../ClusterCard';
import { BigSpinner } from '../SpinnerComponent';
import './ClustersList.css';
import crane from '../../assets/images/craneLogo.png';


class ClustersList extends Component {
  componentDidMount() {
    const { getClustersList } = this.props;
    getClustersList();
  }

  render() {
    const { clusters, isRetrieved, isRetrieving } = this.props;

    return (
      <div className="ClusterList">
        {
          isRetrieving ? (
            <div className="TableLoading">
              <div className="SpinnerWrapper">
                <BigSpinner />
              </div>
            </div>
          ) : (
            <div>
              {isRetrieved ? (clusters.map((cluster) => (
                <Link to={{ pathname: `/clusters/${cluster.id}/resources` }} key={cluster.id}>
                  <div key={cluster.id} className="ClusterCardItem">
                    <ClusterCard
                      name={cluster.name}
                      description={cluster.description}
                      icon={crane}
                    />
                  </div>
                </Link>
              )))
                : (
                  <div className="EmptyList">
                    <h3>No Clusters Available</h3>
                  </div>
                )}
            </div>
          )
        }

      </div>
    );
  }
}

// inititate props
ClustersList.propTypes = {
  clusters: PropTypes.arrayOf(PropTypes.object),
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool
};

// assigning defaults
ClustersList.defaultProps = {
  clusters: [],
  isRetrieved: false,
  isRetrieving: true
};

const mapStateToProps = (state) => {
  const { isRetrieving, clusters, isRetrieved } = state.ClustersReducer;
  return { isRetrieving, clusters, isRetrieved };
};

const mapDispatchToProps = {
  getClustersList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClustersList);
