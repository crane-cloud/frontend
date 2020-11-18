import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './AppMemoryPage.css';
import getAppMemory, { clearAppMemory } from '../../redux/actions/appMemory';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
import LineChartComponent from '../LineChart';
import { formatAppMemoryMetrics, getCurrentTimeStamp, subtractTime } from '../../helpers/formatMetrics';

class AppMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: getCurrentTimeStamp(),
        step: ''
      },
      period: '1d'
    };

    this.getAppName = this.getAppName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.fetchMemory = this.fetchMemory.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const { match: { params }, getAppMemory, clearAppMemory } = this.props;
    const { projectID, appID } = params;

    clearAppMemory();
    getAppMemory(projectID, appID, { step: '2h' });
  }

  getAppName(id) {
    const { apps } = this.props;
    return apps.apps.find((app) => app.id === id).name;
  }

  getDateCreated() {
    const { match: { params }, apps } = this.props;
    const { appID } = params;
    return apps.apps.find((app) => app.id === appID).date_created;
  }

  async handlePeriodChange(period) {
    let days;
    let step;
    let startTimeStamp;

    if (period === '1d') {
      days = 1;
      step = '2h';
    } else if (period === '7d') {
      days = 7;
      step = '1d';
    } else if (period === '1m') {
      days = 30;
      step = '1d';
    } else if (period === '3m') {
      days = 90;
      step = '7d';
    } else if (period === '1y') {
      days = 365;
      step = '1m';
    }

    this.setState({ period }); // this period state will be used to format x-axis values accordingly

    if (period === 'all') {
      startTimeStamp = await Date.parse(this.getDateCreated());
      step = '1d'; // TODO: make dynamic depending on the all-time metrics
    } else {
      startTimeStamp = await subtractTime(getCurrentTimeStamp(), days);
    }

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        step,
      }
    }));

    this.fetchMemory();
  }

  handleCalendarChange(type, timestamp) {
    if (type === 'from') {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          start: timestamp,
        },
      }));
    }

    if (type === 'to') {
      this.setState((prevState) => ({
        time: {
          ...prevState.time,
          end: timestamp,
        },
      }));
    }

    if (type === 'to') {
      this.fetchMemory();
    }
  }

  fetchMemory() {
    const { time } = this.state;
    const { match: { params }, getAppMemory, clearAppMemory } = this.props;
    const { projectID, appID } = params;

    clearAppMemory();
    getAppMemory(projectID, appID, time);
  }

  render() {
    const { match: { params }, isFetchingAppMemory, appMemoryMetrics } = this.props;
    const { projectID, appID, userID } = params;
    const { period } = this.state;

    const formattedMetrics = formatAppMemoryMetrics(appID, appMemoryMetrics, period);

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
                header="Memory"
              />
            </div>
            <div className="ContentSection">
              <MetricsCard
                className="MetricsCardGraph"
                title={<PeriodSelector onPeriodChange={this.handlePeriodChange} onCalendarChange={this.handleCalendarChange} />}
              >
                {isFetchingAppMemory ? (
                  <div className="ContentSectionSpinner">
                    <Spinner />
                  </div>
                ) : (
                  <LineChartComponent yLabel="Memory(MBs)" xLabel="Time" xDataKey="time" lineDataKey="memory" data={formattedMetrics} />
                )}
              </MetricsCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppMemoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isFetchingAppMemory: PropTypes.bool.isRequired,
  appMemoryMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getAppMemory: PropTypes.func.isRequired,
  clearAppMemory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { isFetchingAppMemory, appMemoryMetrics, appMemoryMessage } = state.appMemoryReducer;
  const { apps } = state.appsListReducer;
  return {
    apps,
    isFetchingAppMemory,
    appMemoryMetrics,
    appMemoryMessage
  };
};

const mapDispatchToProps = {
  getAppMemory,
  clearAppMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMemoryPage);
