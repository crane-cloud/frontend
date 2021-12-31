import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getClustersList from "../../redux/actions/clusters";
import ClusterCard from "../ClusterCard";
import Spinner from "../Spinner";
import "./ClustersList.css";
import crane from "../../assets/images/craneLogo.png";

class ClustersList extends Component {
  componentDidMount() {
    const { getClustersList } = this.props;
    getClustersList();
  }

  componentDidUpdate(prevProps) {
    const { getClustersList, newClusterAdded } = this.props;

    if (newClusterAdded !== prevProps.newClusterAdded) {
      getClustersList();
    }
  }

  render() {
    const { clusters, isRetrieved, isRetrieving } = this.props;

    return (
      <div className="ClusterList">
        {isRetrieving ? (
          <div className="TableLoading">
            <div className="SpinnerWrapper">
              <Spinner size="big" />
            </div>
          </div>
        ) : (
          <div>
            {isRetrieved &&
              clusters !== undefined &&
              clusters.map((cluster) => (
                <Link
                  to={{ pathname: `/clusters/${cluster.id}/resources` }}
                  key={cluster.id}
                  state={{ clusterName: cluster.name }}
                >
                  <div key={cluster.id} className="ClusterCardItem">
                    <ClusterCard
                      name={cluster.name}
                      description={cluster.description}
                      icon={crane}
                    />
                  </div>
                </Link>
              ))}
          </div>
        )}
        {isRetrieved && clusters.length === 0 && (
          <div className="NoResourcesMessage">
            <p>No Clusters Available</p>
          </div>
        )}
        {!isRetrieving && !isRetrieved && (
          <div className="NoResourcesMessage">
            <p>Oops! Something went wrong! Failed to retrieve Clusters.</p>
          </div>
        )}
      </div>
    );
  }
}

// inititate props
ClustersList.propTypes = {
  clusters: PropTypes.arrayOf(PropTypes.object),
  getClustersList: PropTypes.func.isRequired,
  newClusterAdded: PropTypes.bool.isRequired,
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool,
};

// assigning defaults
ClustersList.defaultProps = {
  clusters: [],
  isRetrieved: false,
  isRetrieving: true,
};

const mapStateToProps = (state) => {
  const { isRetrieving, clusters: { clusters}, isRetrieved } = state.clustersReducer;
  return { isRetrieving, clusters, isRetrieved };
};

const mapDispatchToProps = {
  getClustersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClustersList);
