import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './PvcsList.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getPvcs from '../../redux/actions/PvcsActions';
import Status from '../Status';
import timePast from '../../helpers/timeUtility';

class PvcsListPage extends React.Component {
  componentDidMount() {
    const { getPvcs } = this.props;
    const { match: { params } } = this.props;
    getPvcs(params.clusterID);
  }

  render() {
    const { pvcs } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    console.log(pvcs);

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Pvcs" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="PvcsList">
                <table className="PvcsTable">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                  {
                    pvcs.length !== 0 ? (
                      pvcs.map((pvc) => (
                        <tr>
                          <td>{pvc.metadata.name}</td>
                          <td className="StatusColumn"><Status status={pvc.status.phase} /></td>
                          <td>{timePast(pvc.metadata.creationTimestamp)}</td>
                        </tr>

                      ))) : (
                      <h3 className="EmptyList">
                        No pvcs Available
                      </h3>
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
