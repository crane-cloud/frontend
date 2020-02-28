/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './NamespacesList.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getNamespaces from '../../redux/actions/NamespacesActions';
import TableList from '../TableList';

class NamespacesListPage extends React.Component {
  componentDidMount() {
    const { getNamespaces } = this.props;
    const { match: { params } } = this.props;
    getNamespaces(params);
  }

  render() {
    const { namespacesList, clusterName } = this.props;

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Namespaces" showBtn={true} />
            </div>
            <div className="LowerBar">
              <TableList data={namespacesList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NamespacesListPage.propTypes = {
  namespacesList: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  clusterName: PropTypes.string,
};

NamespacesListPage.defaultProps = {
  namespacesList: [],
  isRetrieving: false,
  clusterName: '',
};

export const mapStateToProps = (state) => {
  const { isRetrieving, namespacesList, clusterName } = state.ClusterResourcesReducer;
  return { isRetrieving, namespacesList, clusterName };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNamespaces
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NamespacesListPage));
