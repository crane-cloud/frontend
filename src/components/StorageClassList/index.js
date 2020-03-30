import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getStorageClassList from '../../redux/actions/StorageClassesActions';
import tellAge from '../../helpers/ageUtility';
import './StorageClassList.css';
import Header from '../Header';
import { BigSpinner } from '../SpinnerComponent';
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
              <InformationBar header="Nodes" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="ResourcesTable">
                <table className="StorageClassesTable">
                  <tr>
                    <th>Name</th>
                    <th>Provisioner</th>
                    <th>Age</th>
                  </tr>
                  {
                    isRetrieving ? (
                      <tr className="TableLoading">
                        <div className="SpinnerWrapper">
                          <BigSpinner />
                        </div>
                      </tr>
                    ) : (
                      <tbody>
                        {isFetched && storageClasses.storage_classes !== undefined
                          ? (storageClasses.storage_classes.map((storageClass) => (
                            <tr>
                              <td>{storageClass.metadata.name}</td>
                              <td>{storageClass.provisioner}</td>
                              <td>{tellAge(storageClass.metadata.creationTimestamp)}</td>
                            </tr>
                          ))) : (
                            <div className="EmptyList">
                              <h3>No Storage Classes Available</h3>
                            </div>
                          )}
                      </tbody>
                    )
                  }
                </table>

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
  storageClasses: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getStorageClassList: PropTypes.func.isRequired
};

// assigning defaults
StorageClassList.defaultProps = {
  storageClasses: [],
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, storageClasses, isFetched } = state.storageClassesReducer;
  return { isRetrieving, storageClasses, isFetched };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getStorageClassList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorageClassList);
