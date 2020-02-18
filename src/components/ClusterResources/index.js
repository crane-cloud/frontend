import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResourceCard from '../ResourceCard';
import getClusterResourcesCount from '../../redux/actions/ClusterResourcesActions';
import './ClusterResource.css';
import { bindActionCreators } from 'redux';


class ClusterResources extends React.Component {
  componentDidMount() {
    const { getClusterResourcesCount } = this.props;
    getClusterResourcesCount();
  }

  render() {
    const { resource_count } = this.props;
    console.log(resource_count);
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

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClusterResourcesCount: getClusterResourcesCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterResources);
