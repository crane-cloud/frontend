import React from 'react';
import PropTypes from 'prop-types';
import InformationBar from '../InformationBar';
import Header from '../Header';
import SideBar from '../SideBar';
import MetricsCard from '../MetricsCard';
import { ReactComponent as MetricIcon } from '../../assets/images/resource-icon.svg';
import './ProjectMetricsPage.css';
import LineChartComponent from '../LineChart';


class ProjectMetricsPage extends React.Component {

  state = {
    appRelatedInfo: this.props.location.state
  };

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
                header="Project Metrics"
              />
            </div>
            <div className="ContentSection">
              <div className="TopCardsSection">
                <MetricsCard icon={<MetricIcon />} title="CPU">
                  <LineChartComponent preview lineDataKey="uv" data={} />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" data={} />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" data={} />
                </MetricsCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectMetricsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ProjectMetricsPage;
