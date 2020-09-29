import React from 'react';
import { withRouter } from 'react-router-dom';
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

class AppMetricsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appRelatedInfo: this.props.location.state
    };

  }

  componentDidMount() {
    const { getAppLogs, match: { params } } = this.props;
    const { projectID, appID } = params;

    getAppLogs({ projectID, appID }, { timestamps: true });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.state !== state.appRelatedInfo) {
      return {
        appRelatedInfo: props.location.state
      };
    }
    return null;
  }

  render() {
    const { appName, appUrl, liveAppStatus } = this.state.appRelatedInfo;
    const { params } = this.props.match;
    const { projectID, userID, appID } = params;
    const { logs, retrieveingLogs } = this.props;

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={appName}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/apps/${appID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header={appUrl}
                status={liveAppStatus}
              />
            </div>
            <div className="ContentSection">
              <div className="MetricsCardsSection">
                <MetricsCard icon={<MetricIcon />} title="Memory" className="CardSizeDimensions">
                  <LineChartComponent preview lineDataKey="uv"  />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="CPU" className="CardSizeDimensions">
                  <LineChartComponent preview lineDataKey="uv"  />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Storage" className="CardSizeDimensions">
                  <LineChartComponent preview lineDataKey="uv"  />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Network" className="CardSizeDimensions">
                  <LineChartComponent preview lineDataKey="uv"  />
                </MetricsCard>
              </div>
              <div className="LogsSection">
                <LogsFrame loading={retrieveingLogs} data={logs} title={`${appName} logs`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ appLogsReducer, appMemoryReducer }) => {
  const {
    logs, retrievedLogs, retrieveingLogs
  } = appLogsReducer;

  const { 
    isFetchingAppMemory, appMemoryMetrics, appMemoryMessage
  } = appMemoryReducer;

  return {
    isFetchingAppMemory,
    appMemoryMetrics,
    appMemoryMessage,
    logs,
    retrievedLogs,
    retrieveingLogs
  };
};

const mapDispatchToProps = {
  getAppLogs
};

AppMetricsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMetricsPage));
