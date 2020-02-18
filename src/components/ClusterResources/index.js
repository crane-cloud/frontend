import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResourceCard from '../ResourceCard';
import getClusterResourcesCount from '../../redux/actions/ClusterResourcesActions';
import './ClusterResource.css';

const resources = [
  {
    name: 'Nodes',
    resourceNumber: 7
  },
  {
    name: 'Secrets',
    resourceNumber: 3
  },
  {
    name: 'Deployments',
    resourceNumber: 11
  },
  {
    name: 'Pods',
    resourceNumber: 9
  },
  {
    name: 'Volumes',
    resourceNumber: 5
  },
  {
    name: 'Daemon Sets',
    resourceNumber: 0
  },
  {
    name: 'Replica',
    resourceNumber: 2
  }
];


class ClusterResources extends React.Component {
  componentDidMount() {
    const { fetchClusterResources } = this.props;
    fetchClusterResources();
  }

  render() {
    const { resource_count } = this.props;
    return (
      <div className="ClusterContainer">
        {resource_count.map((resource) => (
          <div className="ClusterItem">
            <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
          </div>
        ))}
      </div>
    );
  }
}
ClusterResources.propTypes = {
  allResources: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  isRetrieving: PropTypes.bool
};

ClusterResources.defaultProps = {
  allResources: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, resource_count } = state.ClusterResourcesReducer;
  return { isRetrieving, resource_count };
};

export const mapDispatchToProps = (dispatch) => ({
  getArticles: () => {
    dispatch(getClusterResourcesCount());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterResources);
