import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PvsListPage.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import { BigSpinner } from '../SpinnerComponent';
import getPvs from '../../redux/actions/pvs';
import Status from '../Status';

class PvsListPage extends React.Component {
  componentDidMount() {
    const { getPvs } = this.props;
    const { match: { params } } = this.props;
    getPvs(params.clusterID);
  }

  render() {
    const { pvs, isRetrieving, isFetched } = this.props;
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
                      <tbody>
                        <tr className="TableLoading">
                          <td>
                            <div className="SpinnerWrapper">
                              <BigSpinner />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {(isFetched && pvs !== undefined) && (
                          pvs.map((pv) => (
                            <tr key={pvs.indexOf(pv)}>
                              <td>{pv.metadata.name}</td>
                              <td>{pv.spec.accessModes[0]}</td>
                              <td>{pv.spec.persistentVolumeReclaimPolicy}</td>
                              <td><Status status={pv.status.phase} /></td>
                              <td>{pv.spec.capacity.storage}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    )
                  }
                </table>

                {(isFetched && pvs.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No Volumes Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Volumes.
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


PvsListPage.propTypes = {
  getPvs: PropTypes.func.isRequired,
  pvs: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

PvsListPage.defaultProps = {
  pvs: [],
  isRetrieving: false,
  isFetched: false
};

const mapStateToProps = (state) => {
  const { isRetrieving, pvs, isFetched } = state.pvsReducer;
  return { isRetrieving, pvs, isFetched };
};

const mapDispatchToProps = {
  getPvs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PvsListPage);
