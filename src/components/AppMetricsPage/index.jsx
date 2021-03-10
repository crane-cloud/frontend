import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InformationBar from '../InformationBar';
import Header from '../Header';
import SideBar from '../SideBar';
import MetricsCard from '../MetricsCard';
import { ReactComponent as MetricIcon } from '../../assets/images/resource-icon.svg';
import './AppMetricsPage.css';
import LineChartComponent from '../LineChart';
import LogsFrame from '../LogsFrame';
import getAppLogs from '../../redux/actions/getAppLogs';
import getAppMemory, { clearAppMemory } from '../../redux/actions/appMemory';
import getAppCPU from '../../redux/actions/appCPU';
import { formatAppMemoryMetrics, formatAppCPUMetrics, formatAppNetworkMetrics } from '../../helpers/formatMetrics';
import getAppNetwork from '../../redux/actions/appNetwork';

class AppMetricsPage extends React.Component {
  constructor(props) {
    super(props);

    this.getAppMemoryMetrics = this.getAppMemoryMetrics.bind(this);
    this.getAppCPUMetrics = this.getAppCPUMetrics.bind(this);
    this.getAppNetworkMetrics = this.getAppNetworkMetrics.bind(this);

  }

  getAppInfo(id) {
    const { apps } = this.props;
    const found = apps.apps.find((app) => app.id === id);
    const info = {
      name: found.name,
      status: found.app_running_status,
      url: found.url
    };

    return info;
  }

  componentDidMount() {
    const {
      getAppLogs,
      getAppMemory,
      getAppCPU,
      getAppNetwork,
      match: { params } } = this.props;
    const { projectID, appID } = params;

    getAppLogs({ projectID, appID }, { timestamps: true });
    clearAppMemory();
    getAppMemory(projectID, appID, {});
    getAppCPU(projectID, appID, {});
    getAppNetwork(projectID, appID, {})
    
  }

  getAppMemoryMetrics(){
    const { appID } = this.props.match.params;
    const { appMemoryMetrics } = this.props;
    const results = formatAppMemoryMetrics(appID, appMemoryMetrics);
    return results;
  }

  getAppCPUMetrics(){
    const { appID } = this.props.match.params;
    const { appCPUMetrics } = this.props;
    const results = formatAppCPUMetrics(appID, appCPUMetrics);
    return results;
  }

  getAppNetworkMetrics(){
    const { appID } = this.props.match.params;
    const { appNetworkMetrics } = this.props;
    const results = formatAppNetworkMetrics(appID, appNetworkMetrics);
    return results;
  }

  render() {
    const { params } = this.props.match;
    const { projectID, userID, appID } = params;
    const { logs, retrieveingLogs } = this.props;

    const formattedMemoryMetrics = this.getAppMemoryMetrics();
    const formattedCPUMetrics = this.getAppCPUMetrics();
    const formattedNetworkMetrics = this.getAppNetworkMetrics();
    const appInfo = this.getAppInfo(appID);
    
    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={appInfo.name}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/apps/${appID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header={appInfo.url}
                status={appInfo.status}
              />
            </div>
            <div className="ContentSection">
              <div className="MetricsCardsSection">
                <MetricsCard icon={<MetricIcon />} title="Memory" className="CardSizeDimensions">
                  <LineChartComponent lineDataKey="memory" preview data={formattedMemoryMetrics}/>
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="CPU" className="CardSizeDimensions">
                  <LineChartComponent lineDataKey="cpu" preview data={formattedCPUMetrics}/>
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Network" className="CardSizeDimensions">
                  <LineChartComponent lineDataKey="network" preview data={formattedNetworkMetrics} />
                </MetricsCard>
              </div>
              <div className="LogsSection">
                <LogsFrame loading={retrieveingLogs} data={logs} title={`${appInfo.name} logs`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    logs, retrievedLogs, retrieveingLogs
  } = state.appLogsReducer;

  const { 
    isFetchingAppMemory, appMemoryMetrics, appMemoryMessage
  } = state.appMemoryReducer;

  const {
    isFetchingCPU, appCPUMetrics, cpuMessage
  } = state.appCpuReducer;

  const {
    appNetworkMetrics, isFetchingAppNetwork, appNetworkMessage
  } = state.appNetworkReducer;

  const { apps } = state.appsListReducer;

  return {
    isFetchingAppMemory,
    appMemoryMetrics,
    appMemoryMessage,
    logs,
    retrievedLogs,
    retrieveingLogs,
    isFetchingCPU,
    appCPUMetrics,
    cpuMessage,
    appNetworkMetrics,
    isFetchingAppNetwork,
    appNetworkMessage,
    apps
  };

};

const mapDispatchToProps = {
  getAppMemory,
  clearAppMemory,
  getAppLogs,
  getAppCPU,
  getAppNetwork,
};

AppMetricsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMetricsPage);
