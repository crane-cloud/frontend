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
import Spinner from '../Spinner';

const sampleData = [
  { name: 'Sample Metric 1', uv: 250 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 10 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 70 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 60 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 190 },
  { name: 'Sample Metric 2', uv: 290 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 130 },
  { name: 'Sample Metric 2', uv: 0 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 280 },
  { name: 'Sample Metric 2', uv: 300 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 170 },
  { name: 'Sample Metric 2', uv: 290 },
];

// this function is meant to shuffle the dummy data array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

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

    getAppLogs({ projectID, appID }, {});
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

    console.log(logs);

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
              <div className="TopCardsSection">
                <MetricsCard icon={<MetricIcon />} title="CPU">
                  <LineChartComponent preview lineDataKey="uv" data={shuffle(sampleData)} />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" data={shuffle(sampleData)} />
                </MetricsCard>
              </div>
              <div className="LogsSection">
                {retrieveingLogs ? (
                  <Spinner />
                ) : (
                  <LogsFrame data={[]} title={`${appName} logs`} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ appLogsReducer }) => {
  const {
    logs, retrievedLogs, retrieveingLogs
  } = appLogsReducer;

  return {
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
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMetricsPage));
