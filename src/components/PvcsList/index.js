import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { pvcs, isRetrieving, isFetched } = this.props;
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
                        {(isFetched && pvcs !== undefined) && (
                          pvcs.map((pvc) => (
                            <tr>
                              <td>{pvc.metadata.name}</td>
                              <td><Status status={pvc.status.phase} /></td>
                              <td>{tellAge(pvc.metadata.creationTimestamp)}</td>
                            </tr>

                          ))
                        )}
                      </tbody>
                    )
                  }
                </table>

                {(isFetched && pvcs.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No Volume Claims Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Volume Claims.
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

PvcsListPage.propTypes = {
  pvcs: PropTypes.object,
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,

};

PvcsListPage.defaultProps = {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
};

const mapStateToProps = (state) => {
  const { isRetrieving, pvcs, isFetched } = state.PvcsReducer;
  return { isRetrieving, pvcs, isFetched };
};

const mapDispatchToProps = {
  getPvcs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PvcsListPage);
