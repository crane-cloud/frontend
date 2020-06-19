import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './NamespacesList.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getNamespaces from '../../redux/actions/namespaces';
import Status from '../Status';
import tellAge from '../../helpers/ageUtility';
import Spinner from '../Spinner';


class NamespacesListPage extends React.Component {
  componentDidMount() {
    const { getNamespaces } = this.props;
    const { match: { params } } = this.props;
    getNamespaces(params);
  }

  render() {
    const { namespacesList, isRetrieving, isRetrieved } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    const { match: { params } } = this.props;

    return (
      <div className="MainPage">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Namespaces" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className={isRetrieving ? 'ResourcesTable LoadingResourcesTable' : 'ResourcesTable'}>
                <table className="NamespacesTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  {
                    isRetrieving ? (
                      <tbody>
                        <tr className="TableLoading">
                          <td>
                            <div className="SpinnerWrapper">
                              <Spinner size="big" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {isRetrieved && namespacesList.length !== 0 && (
                          namespacesList.map((namespace) => (
                            <tr key={namespacesList.indexOf(namespace)}>
                              <td>{namespace.metadata.name}</td>
                              <td className="StatusColumn"><Status status={namespace.status.phase} /></td>
                              <td>{tellAge(namespace.metadata.creationTimestamp)}</td>
                            </tr>

                          )))}
                      </tbody>
                    )
                  }
                </table>
                {(isRetrieved && namespacesList.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No namespaces available</p>
                  </div>
                )}
                {(!isRetrieving && !isRetrieved) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve namespaces.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NamespacesListPage.propTypes = {
  getNamespaces: PropTypes.func.isRequired,
  namespacesList: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  isRetrieved: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

NamespacesListPage.defaultProps = {
  namespacesList: [],
  isRetrieving: false,
  isRetrieved: false,
};

const mapStateToProps = (state) => {
  const {
    isRetrieved, isRetrieving, namespacesList, clusterName
  } = state.namespacesListReducer;
  return {
    isRetrieved, isRetrieving, namespacesList, clusterName
  };
};

const mapDispatchToProps = {
  getNamespaces
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespacesListPage);
