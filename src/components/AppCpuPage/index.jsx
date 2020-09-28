import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header'
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './AppCpuPage.css';
import getAppCPU, { clearAppCPU } from '../../redux/actions/appCPU';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
import LineChartComponent from '../LineChart';
import { formatAppCPUMetrics, getCurrentTimeStamp, subtractTime } from '../../helpers/formatMetrics';

class AppCpuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: getCurrentTimeStamp(),
        step: '' 
      } 
    };

    this.getAppName = this.getAppName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchCpu = this.fetchCpu.bind(this);
  }

  componentDidMount() {
    const { match: { params }, getAppCPU, clearAppCPU } = this.props;
    const { projectID, appID } = params;
    clearAppCPU();
    getAppCPU(projectID, appID, {});
  }

  getAppName(id) {
    const { apps } = this.props;
    return apps.apps.find((app) => app.id === id).name;
  }

  // translateTimestamp(timestamp) {
  //   const timestampMillisecond = timestamp * 1000; // convert timestamp to milliseconds
  //   const dateObject = new Date(timestampMillisecond); // create a date object out of milliseconds
  //   return dateObject.toLocaleString();
  // }

  // formatMetrics(appID) {
  //   const { cpuMetrics } = this.props;
  //   const found = cpuMetrics.find((metric) => cpuMetrics.app === appID);
  //   const cpuData = [];

  //   if (found !== undefined) {
  //     if (found.metrics.length > 0) {
  //       found.metrics.forEach((metric) => {
  //         const newMetricObject = {
  //           time: this.translateTimestamp(metric.timestamp),
  //           cpu: metric.value * 10 // multiplying by 10 fot graph plotting
  //         };

  //         cpuData.push(newMetricObject);
  //       });
  //     } else {
  //       cpuData.push({ time: 0, cpu: 0 });
  //       cpuData.push({ time: 0, cpu: 0 });
  //     }
  //   }
  //   return cpuData;
  // }

  async handlePeriodChange(period) {
    let days;
    let step;
    if (period === '1d') {
      days = 1;
      step = '2h';
    } else if (period === '7d') {
      days = 7;
      step = '1d';
    } else if (period === '1m') {
      days = 30; step = '1d';
    } else if (period === '3m') {
      days = 90; step = '7d';
    } else if (period === '1y') {
      days = 365; step = '1m';
    }

    const startTimeStamp = await subtractTime(getCurrentTimeStamp(), days);

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        step,
      }
    }));

    this.fetchCpu();
  }

  fetchCpu() {
    const { time } = this.state;
    const { match: { params }, getAppCPU, clearAppCPU } = this.props;
    const { projectID, appID } = params;

    clearAppCPU();
    getAppCPU(projectID, appID, time);
  }
  
  render() {
    const { match: { params }, isFetchingCPU, cpuMetrics } = this.props;
    const { projectID, appID, userID } = params;

    const formattedMetrics = formatAppCPUMetrics(appID, cpuMetrics);

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getAppName(appID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/apps/${appID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="CPU"
              />
            </div>
            <div className="ContentSection">
              <MetricsCard
                className="MetricsCardGraph"
                title={<PeriodSelector onChange={this.handlePeriodChange} />} >

                {isFetchingCPU ? (
                  <div className="ContentSectionSpinner">
                    <Spinner />
                  </div>
                ) : (
                  <LineChartComponent yLabel="CPU(cores)" xLabel="Time" lineDataKey="cpu" data={formattedMetrics} />
                )} 
              </MetricsCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppCpuPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isFetchingCPU: PropTypes.bool.isRequired,
  cpuMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getAppCPU: PropTypes.func.isRequired,
  clearAppCPU: PropTypes.func.isRequired,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = (state) => {
  const { isFetchingCPU, cpuMetrics, cpuMessage } = state.appCpuReducer;
  const { apps } = state.appsListReducer;
  return { apps, isFetchingCPU, cpuMetrics, cpuMessage };
};

const mapDispatchToProps = {
  getAppCPU, clearAppCPU
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCpuPage);