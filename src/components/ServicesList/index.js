import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ServicesList.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import { BigSpinner } from '../SpinnerComponent';
import SideNav from '../SideNav';
import getServices from '../../redux/actions/services';

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
    const { services, isRetrieving, isFetched } = this.props;
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
              <InformationBar header="Services" showBtn={false} />
            </div>
            <div className="ContentSection">
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
                        {(isFetched && services !== undefined) && (
                          services.map((service) => (
                            <tr>
                              <td>{service.metadata.name}</td>
                              <td>{service.spec.type}</td>
                              <td>{service.spec.clusterIP}</td>
                              <td>{this.showPorts(service.spec.ports)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    )
                  }
                </table>

                {(isFetched && services.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No Services Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Services.
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

ServicesListPage.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object),
  isFetched: PropTypes.bool,
  isRetrieving: PropTypes.bool,
};

ServicesListPage.defaultProps = {
  services: [],
  isRetrieving: false,
  isFetched: false,
};

const mapStateToProps = (state) => {
  const { isRetrieving, services, isFetched } = state.servicesReducer;
  return { isRetrieving, services, isFetched };
};

const mapDispatchToProps = {
  getServices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesListPage);
