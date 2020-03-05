import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './PvsListPage.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getPvs from '../../redux/actions/PvsActions';
import Status from '../Status';
import tellAge from '../../helpers/ageUtility';

class PvsListPage extends React.Component {
  componentDidMount() {
    const { getPvs } = this.props;
    const { match: { params } } = this.props;
    getPvs(params.clusterID);
  }

  render() {
    const { pvs } = this.props;
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
              <InformationBar header="Volumes" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="ResourcesTable">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Access Mode</th>
                    <th>Reclaim Policy</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                  {
                    pvs.length !== 0 ? (
                      pvs.map((pv) => (
                        <tr>
                          <td>{pv.metadata.name}</td>
                          <td>{pv.spec.accessModes[0]}</td>
                          <td>{pv.spec.persistentVolumeReclaimPolicy}</td>
                          <td><Status status={pv.status.phase} /></td>
                          <td>{tellAge(pv.metadata.creationTimestamp)}</td>
                        </tr>

                      ))) : (
                      <h3 className="EmptyList">
                        No Volumes Available
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
