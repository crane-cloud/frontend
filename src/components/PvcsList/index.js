import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './PvcsList.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getPvcs from '../../redux/actions/PvcsActions';
import Status from '../Status';
import tellAge from '../../helpers/ageUtility';
import { BigSpinner } from '../SpinnerComponent';

class PvcsListPage extends React.Component {
  componentDidMount() {
    const { getPvcs } = this.props;
    const { match: { params } } = this.props;
    getPvcs(params.clusterID);
  }

  render() {
    const { pvcs, isRetrieving } = this.props;
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
              <InformationBar header="Volume Claims" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="ResourcesTable">
                <table>
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
                        {pvcs.length !== 0 ? (
                          pvcs.map((pvc) => (
                            <tr>
                              <td>{pvc.metadata.name}</td>
                              <td><Status status={pvc.status.phase} /></td>
                              <td>{tellAge(pvc.metadata.creationTimestamp)}</td>
                            </tr>

                          )))
                          : (
                            <tr>
                              <div className="EmptyList">
                                <h3>No Pvcs Available</h3>
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

PvcsListPage.propTypes = {
  pvcs: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

PvcsListPage.defaultProps = {
  pvcs: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, pvcs } = state.PvcsReducer;
  return { isRetrieving, pvcs };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPvcs
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PvcsListPage);
