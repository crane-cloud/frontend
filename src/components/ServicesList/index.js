import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ServicesList.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getServices from '../../redux/actions/ServicesActions';
import Status from '../Status';
import timePast from '../../helpers/timeUtility';

class ServicesListPage extends React.Component {
  componentDidMount() {
    const { getServices } = this.props;
    const { match: { params } } = this.props;
    getServices(params.clusterID);
  }

  render() {
    const { servicesArray } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    console.log(servicesArray);

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Services" showBtn={false} />
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
                    servicesArray.length !== 0 ? (
                      servicesArray.map((singleService) => (
                        <tr>
                          <td>{singleService.metadata.name}</td>
                          <td><Status status={singleService.status.phase} /></td>
                          <td>{timePast(singleService.metadata.creationTimestamp)}</td>
                        </tr>

                      ))) : (
                      <h3 className="EmptyList">
                        No Services Available
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

ServicesListPage.propTypes = {
  servicesArray: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

ServicesListPage.defaultProps = {
  servicesArray: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, servicesArray } = state.ServicesReducer;
  return { isRetrieving, servicesArray };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getServices
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesListPage);
