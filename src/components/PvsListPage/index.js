import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './PvsListPage.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import { BigSpinner } from '../SpinnerComponent';
import getPvs from '../../redux/actions/PvsActions';
import Status from '../Status';

class PvsListPage extends React.Component {
  componentDidMount() {
    const { getPvs } = this.props;
    const { match: { params } } = this.props;
    getPvs(params.clusterID);
  }

  render() {
    const { pvs, isRetrieving } = this.props;
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
              <InformationBar header="Volumes" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="ResourcesTable">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Access Mode</th>
                      <th>Reclaim Policy</th>
                      <th>Status</th>
                      <th>Capacity</th>
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
                        {pvs.length !== 0 ? (
                          pvs.map((pv) => (
                            <tr>
                              <td>{pv.metadata.name}</td>
                              <td>{pv.spec.accessModes[0]}</td>
                              <td>{pv.spec.persistentVolumeReclaimPolicy}</td>
                              <td><Status status={pv.status.phase} /></td>
                              <td>{pv.spec.capacity.storage}</td>
                            </tr>

                          )))
                          : (
                            <tr>
                              <div className="EmptyList">
                                <h3>No Volumes Available</h3>
                              </div>
                            </tr>
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

PvsListPage.propTypes = {
  pvs: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

PvsListPage.defaultProps = {
  pvs: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, pvs } = state.PvsReducer;
  return { isRetrieving, pvs };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPvs
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PvsListPage);
