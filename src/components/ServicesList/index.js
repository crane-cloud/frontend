import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ServicesList.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import { BigSpinner } from '../SpinnerComponent';
import SideNav from '../SideNav';
import getServices from '../../redux/actions/ServicesActions';

class ServicesListPage extends React.Component {
  componentDidMount() {
    const { getServices } = this.props;
    const { match: { params } } = this.props;
    getServices(params.clusterID);
  }

  showPorts(ports) {
    let portValue = '';
    ports.map((port) => {
      if (portValue !== '') {
        portValue += ', ';
      }
      portValue += `${port.port}`;
      if (port.nodePort !== undefined) {
        portValue += `:${port.nodePort}`;
      }
      portValue += `/${port.protocol}`;
      return portValue;
    });
    return portValue;
  }

  render() {
    const { services, isRetrieving } = this.props;
    const clusterName = localStorage.getItem('clusterName');

    return (
      <div>
        <Header />
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
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Cluster IP</th>
                      <th>Ports</th>
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
                        {services.length !== 0 ? (
                          services.map((service) => (
                            <tr>
                              <td>{service.metadata.name}</td>
                              <td>{service.spec.type}</td>
                              <td>{service.spec.clusterIP}</td>
                              <td>{this.showPorts(service.spec.ports)}</td>
                            </tr>

                          )))
                          : (
                            <tr>
                              <div className="EmptyList">
                                <h3>No Services Available</h3>
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
