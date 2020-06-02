/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './ClusterResourcesPage.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import Spinner from '../Spinner';
import SideNav from '../SideNav';
import ResourceCard from '../ResourceCard';
import getClusterResourcesCount from '../../redux/actions/clusterResources';

class ClusterResourcesPage extends React.Component {
  componentDidMount() {
    const { getClusterResourcesCount } = this.props;
    const { match: { params } } = this.props;
    getClusterResourcesCount(params);
  }

  render() {
    const {
      resourceCount, isRetrieving, isRetrieved, clusterName, match: { params }
    } = this.props;
    localStorage.setItem('clusterName', clusterName);

    return (
      <div className="MainPage">

        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Overview" showBtn={false} />

            </div>
            <div className="ContentSection">
              {isRetrieving ? (
                <div className="ResourceSpinnerWrapper">
                  <Spinner />
                </div>
              ) : (
                <div className="ClusterContainer">

                  {(isRetrieved && resourceCount !== undefined) && (
                    (resourceCount.map(
                      (resource) => (
                        <Link to={{ pathname: `/clusters/${params.clusterID}/${resource.name.toLowerCase()}` }} key={resourceCount.indexOf(resource)}>
                          <ResourceCard title={resource.name} count={resource.count} />
                        </Link>
                      )
                    )))}
                </div>
              )}
              {(isRetrieved && resourceCount.length === 0) && (
                <div className="NoContentDiv">
                  <p>No Cluster Resources available</p>
                </div>
              )}
              {(!isRetrieving && !isRetrieved) && (
                <div className="NoContentDiv">
                  <p>
                    Oops! Something went wrong!
                    Failed to retrieve Cluster Resources.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClusterResourcesPage.propTypes = {
  resourceCount: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  isRetrieved: PropTypes.bool,
  clusterName: PropTypes.string,
  getClusterResourcesCount: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

ClusterResourcesPage.defaultProps = {
  resourceCount: [],
  isRetrieving: false,
  isRetrieved: false,
  clusterName: '',
};

const mapStateToProps = (state) => {
  const {
    isRetrieving, isRetrieved, resourceCount, clusterName
  } = state.clusterResourcesReducer;
  return {
    isRetrieving, isRetrieved, resourceCount, clusterName
  };
};

const mapDispatchToProps = {
  getClusterResourcesCount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterResourcesPage);
