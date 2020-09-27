import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getStorageClassList from '../../redux/actions/storageClasses';
import tellAge from '../../helpers/ageUtility';
import './StorageClassList.css';
import Header from '../Header';
import Spinner from '../Spinner';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class StorageClassList extends Component {
  componentDidMount() {
    const { match, getStorageClassList } = this.props;
    getStorageClassList(match.params.clusterID);
  }


  render() {
    const { storageClasses, isFetched, isRetrieving } = this.props;
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
              <InformationBar header="Storage Classes" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className={isRetrieving ? 'ResourcesTable LoadingResourcesTable' : 'ResourcesTable'}>
                <table className="StorageClassesTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Provisioner</th>
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
                        {isFetched && storageClasses.storage_classes !== undefined && (
                          (storageClasses.storage_classes.map((storageClass) => (
                            <tr key={storageClasses.storage_classes.indexOf(storageClass)}>
                              <td>{storageClass.metadata.name}</td>
                              <td>{storageClass.provisioner}</td>
                              <td>{tellAge(storageClass.metadata.creationTimestamp)}</td>
                            </tr>
                          )))
                        )}
                      </tbody>
                    )
                  }
                </table>
                {(isFetched && storageClasses.storage_classes.length === 0) && (
                  <div className="NoResourcesMessage">
                    <p>No Storage Classes Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Storage Classes.
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

// inititate props
StorageClassList.propTypes = {
  storageClasses: PropTypes.shape({
    storage_classes: PropTypes.arrayOf(PropTypes.object)
  }),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getStorageClassList: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

// assigning defaults
StorageClassList.defaultProps = {
  storageClasses: {},
  isRetrieving: false,
  isFetched: false,
};

const mapStateToProps = (state) => {
  const { isRetrieving, storageClasses, isFetched } = state.storageClassesReducer;
  return { isRetrieving, storageClasses, isFetched };
};

const mapDispatchToProps = {
  getStorageClassList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorageClassList);
