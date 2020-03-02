import React from 'react';
import PropTypes from 'prop-types';
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
    
    console.log(this.props);
    console.log(namespacesList);

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Namespaces" showBtn={false} />
            </div>
            <div className="LowerBar">
            <div className="ClusterList">
              <table className="NamespacesTable">
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Age</th>
                </tr>
                {
                  namespacesList.length !== 0 ? (
                    namespacesList.map((namespace) => (
                      <tr>
                        <td>{namespace.metadata.name}</td>
                        <td>{this.namespacesListtatuses(namespace.status.containerStatuses)}</td>
                        <td>{namespace.status.phase}</td>
                        <td>{tellTime(namespace.metadata.creationTimestamp)}</td>
                      </tr>

                    ))) : (
                      <h3 className="EmptyList">No Namespaces Available</h3>
                    )
                  }
              </table>

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
  const { isRetrieving, namespacesList, clusterName } = state.NamespacesListReducer;
  return { isRetrieving, namespacesList, clusterName };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNamespaces
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespacesListPage);
