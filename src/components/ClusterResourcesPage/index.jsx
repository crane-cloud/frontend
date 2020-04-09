/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ClusterResourcesPage.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import ResourceCard from '../ResourceCard';
import getClusterResourcesCount from '../../redux/actions/ClusterResourcesActions';

class ClusterResourcesPage extends React.Component {
  componentDidMount() {
    const { getClusterResourcesCount } = this.props;
    const { match: { params } } = this.props;
    getClusterResourcesCount(params);
  }

  render() {
    const { resourceCount, clusterName, match: { params } } = this.props;
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
              <div className="ClusterContainer">
                {
                  resourceCount.length !== 0 ? (resourceCount.map(
                    (resource) => (
                      <Link to={{ pathname: `/clusters/${params.myClusterID}/${resource.name.toLowerCase()}` }} key={resource.count}>
                        <ResourceCard title={resource.name} count={resource.count} />
                      </Link>
                    )
                  )) : (
                    <h3 className="EmptyList">No Resources Available</h3>
                  )
                }
              </div>
              {/* <ClusterResources
                resourceCount={resourceCount}
                myClusterID={params.clusterID}
              /> */}
              {/* {(isFetched && deployments.length === 0) && (
                <div className="NoContentDiv">
                  <p>No deployments available</p>
                </div>
              )}
              {(!isFetchingDeployments && !isFetched) && (
                <div className="NoContentDiv">
                  <p>
                    Oops! Something went wrong!
                    Failed to retrieve deployments.
                  </p>
                </div>
              )} */}
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
  clusterName: PropTypes.string,
};

ClusterResourcesPage.defaultProps = {
  resourceCount: [],
  isRetrieving: false,
  clusterName: '',
};

export const mapStateToProps = (state) => {
  const { isRetrieving, resourceCount, clusterName } = state.ClusterResourcesReducer;
  return { isRetrieving, resourceCount, clusterName };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClusterResourcesCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClusterResourcesPage));
