import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './NamespacesList.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getNamespaces from '../../redux/actions/NamespacesActions';
import Status from '../Status';
import tellAge from '../../helpers/ageUtility';
import { BigSpinner } from '../SpinnerComponent';


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
              <div className="ResourcesTable">
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
                      <tr className="TableLoading">
                        <div className="SpinnerWrapper">
                          <BigSpinner />
                        </div>
                      </tr>
                    ) : (
                      <tbody>
                        {isRetrieved && namespacesList.length !== 0 && (
                          namespacesList.map((namespace) => (
                            <tr>
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
                  <div className="FailedToRetrieveMsg">
                    <p>No namespaces available</p>
                  </div>
                )}
                {(!isRetrieving && !isRetrieved) && (
                  <div className="FailedToRetrieveMsg">
                    <p>
                      Oops! Something went wrong!
                      <br />
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
  namespacesList: PropTypes.object,
  isRetrieving: PropTypes.bool,
  isRetrieved: PropTypes.bool,
  clusterName: PropTypes.string,
};

NamespacesListPage.defaultProps = {
  namespacesList: [],
  isRetrieving: false,
  isRetrieved: false,
  clusterName: '',
};

export const mapStateToProps = (state) => {
  const {
    isRetrieved, isRetrieving, namespacesList, clusterName
  } = state.NamespacesListReducer;
  return {
    isRetrieved, isRetrieving, namespacesList, clusterName
  };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNamespaces
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespacesListPage);
