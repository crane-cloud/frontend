import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getStorageClassList from '../../redux/actions/StorageClassesActions';
import tellAge from '../../helpers/ageUtility';
import './StorageClassList.css';
import NavBar from '../NavBar';
import SpinnerComponents from '../SpinnerComponent';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class StorageClassList extends Component {
  componentDidMount() {
    const { getStorageClassList } = this.props;
    const { match: { params } } = this.props;
    getStorageClassList(params.clusterID);
  }


  render() {
    const { storageClasses, isFetched, isRetrieving } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    return (

      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Storage Classes" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="ResourcesTable">
                <table className="StorageClassesTable">
                  <tr>
                    <th>Name</th>
                    <th>Provisioner</th>
                    <th>Age</th>
                  </tr>
                  {
                    isRetrieving ? (
                      <div className="CenterSpinner"><SpinnerComponents /></div>
                    ) : (
                      isFetched ? (storageClasses.storage_classes.map((storageClass) => (
                        <tr>
                          <td>{storageClass.metadata.name}</td>
                          <td>{storageClass.provisioner}</td>
                          <td>{tellAge(storageClass.metadata.creationTimestamp)}</td>
                        </tr>
                      ))) : (
                        <h3 className="EmptyList">No Storage Classes Available</h3>
                      )
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
  storageClasses: PropTypes.object,
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getStorageClassList: PropTypes.func
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
