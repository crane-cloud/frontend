import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourceCard from '../ResourceCard';
import getClusterResourcesCount from '../../redux/actions/ClusterResourcesActions';
import './ClusterResource.css';


class ClusterResources extends React.Component {

  componentDidMount() {
    const { getClusterResourcesCount } = this.props;
    getClusterResourcesCount();
  }

  render() {
    const { resourceCount } = this.props;
    console.log(resourceCount);
    return (
      <div className="ClusterContainer">
        {resourceCount.map((resource) => (
          <div className="ClusterItem">
            <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
          </div>
        ))}
      </div>
    );
  }
}
ClusterResources.propTypes = {
  resourceCount: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  isRetrieving: PropTypes.bool
};

ClusterResources.defaultProps = {
  resourceCount: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, resourceCount } = state.ClusterResourcesReducer;
  return { isRetrieving, resourceCount };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClusterResourcesCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterResources);
