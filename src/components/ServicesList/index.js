import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ServicesList.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getServices from '../../redux/actions/ServicesActions';
import tellAge from '../../helpers/ageUtility';

class ServicesListPage extends React.Component {
  componentDidMount() {
    const { getServices } = this.props;
    const { match: { params } } = this.props;
    getServices(params.clusterID);
  }

  render() {
    const { services } = this.props;
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
              <InformationBar header="Services" showBtn={false} />
            </div>
            <div className="LowerBar">
              <div className="ResourcesTable">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Cluster IP</th>
                    <th>Age</th>
                  </tr>
                  {
                    services.length !== 0 ? (
                      services.map((service) => (
                        <tr>
                          <td>{service.metadata.name}</td>
                          <td>{service.spec.type}</td>
                          <td>{service.spec.clusterIP}</td>
                          <td>{tellAge(service.metadata.creationTimestamp)}</td>
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
  services: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

ServicesListPage.defaultProps = {
  services: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, services } = state.ServicesReducer;
  return { isRetrieving, services };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getServices
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesListPage);
