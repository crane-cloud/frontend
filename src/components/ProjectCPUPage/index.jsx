import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './ProjectCPUPage.css';
import getProjectCPU, { clearProjectCPU } from '../../redux/actions/projectCPU';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
import LineChartComponent from '../LineChart';
import { formatCPUMetrics, getCurrentTimeStamp, subtractTime } from '../../helpers/formatMetrics';

class ProjectCPUPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: getCurrentTimeStamp(),
        step: ''
      }
    };

    this.getProjectName = this.getProjectName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchCPU = this.fetchCPU.bind(this);
  }

  componentDidMount() {
    const { match: { params }, getProjectCPU, clearProjectCPU } = this.props;
    const { projectID } = params;
    clearProjectCPU();
    getProjectCPU(projectID, {});
  }

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

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
      days = 30;
      step = '1d';
    } else if (period === '3m') {
      days = 90;
      step = '7d';
    } else if (period === '1y') {
      days = 365;
      step = '1m';
    }

    const startTimeStamp = await subtractTime(getCurrentTimeStamp(), days);

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        step,
      }
    }));

    this.fetchCPU();
  }

  fetchCPU() {
    const { time } = this.state;
    const { match: { params }, getProjectCPU, clearProjectCPU } = this.props;
    const { projectID } = params;

    clearProjectCPU();
    getProjectCPU(projectID, time);
  }

  render() {
    const { match: { params }, isFetchingCPU, cpuMetrics } = this.props;
    const { projectID, userID } = params;

    const formattedMetrics = formatCPUMetrics(projectID, cpuMetrics);

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projectID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
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
                title={<PeriodSelector onChange={this.handlePeriodChange} />}
              >
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

ProjectCPUPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isFetchingCPU: PropTypes.bool.isRequired,
  cpuMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectCPU: PropTypes.func.isRequired,
  clearProjectCPU: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = (state) => {
  const { isFetchingCPU, cpuMetrics, cpuMessage } = state.projectCPUReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetchingCPU,
    cpuMetrics,
    cpuMessage
  };
};

const mapDispatchToProps = {
  getProjectCPU,
  clearProjectCPU
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCPUPage);
