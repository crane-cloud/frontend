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
import timePast from '../../helpers/timeUtility';

class PvsListPage extends React.Component {
  componentDidMount() {
    const { getPvs } = this.props;
    const { match: { params } } = this.props;
    getPvs(params.clusterID);
  }

  render() {
    const { volumes } = this.props;
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
              <InformationBar header="PVs" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="ResourcesTable">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                  {
                    volumes.length !== 0 ? (
                      volumes.map((volume) => (
                        <tr>
                          <td>{volume.metadata.name}</td>
                          <td><Status status={volume.status.phase} /></td>
                          <td>{timePast(volume.metadata.creationTimestamp)}</td>
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
  volumes: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

PvsListPage.defaultProps = {
  volumes: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, volumes } = state.PvsReducer;
  return { isRetrieving, volumes };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPvs
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PvsListPage);
