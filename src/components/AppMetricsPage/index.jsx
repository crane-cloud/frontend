import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import MetricsCard from "../MetricsCard";
import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";
import styles from "./AppMetricsPage.module.css";
import LineChartComponent from "../LineChart";
import LogsFrame from "../LogsFrame";
import getAppLogs from "../../redux/actions/getAppLogs";
import getAppMemory, { clearAppMemory } from "../../redux/actions/appMemory";
import getAppCPU from "../../redux/actions/appCPU";
import {
  formatAppMemoryMetrics,
  formatAppCPUMetrics,
  formatAppNetworkMetrics,
} from "../../helpers/formatMetrics";
import getAppNetwork from "../../redux/actions/appNetwork";
import AppStatus from "../AppStatus";
import { ReactComponent as CopyText } from "../../assets/images/copytextblue.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";

class AppMetricsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlChecked: false,
    };

    this.getAppMemoryMetrics = this.getAppMemoryMetrics.bind(this);
    this.getAppCPUMetrics = this.getAppCPUMetrics.bind(this);
    this.getAppNetworkMetrics = this.getAppNetworkMetrics.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
  }

  getAppInfo(id) {
    const { apps } = this.props;
    const found = apps.apps.find((app) => app.id === id);
    const info = {
      name: found.name,
      status: found.app_running_status,
      url: found.url,
      age: found.age,
      alias: found.alias,
      image: found.image,
      port: found.port,
    };

    return info;
  }

  componentDidMount() {
    const {
      getAppLogs,
      getAppMemory,
      getAppCPU,
      getAppNetwork,
      match: { params },
    } = this.props;
    const { projectID, appID } = params;

    getAppLogs({ projectID, appID }, { timestamps: true });
    clearAppMemory();
    getAppMemory(projectID, appID, {});
    getAppCPU(projectID, appID, {});
    getAppNetwork(projectID, appID, {});
  }

  getAppMemoryMetrics() {
    const { appID } = this.props.match.params;
    const { appMemoryMetrics } = this.props;
    const results = formatAppMemoryMetrics(appID, appMemoryMetrics);
    return results;
  }

  copyUrl() {
    const { params } = this.props.match;
    const { appID } = params;
    const app = this.getAppInfo(appID);
    navigator.clipboard.writeText(app.url);
    this.setState({ urlChecked: true });
  }

  getAppCPUMetrics() {
    const { appID } = this.props.match.params;
    const { appCPUMetrics } = this.props;
    const results = formatAppCPUMetrics(appID, appCPUMetrics);
    return results;
  }

  getAppNetworkMetrics() {
    const { appID } = this.props.match.params;
    const { appNetworkMetrics } = this.props;
    const results = formatAppNetworkMetrics(appID, appNetworkMetrics);
    return results;
  }

  render() {
    const { params } = this.props.match;
    const { projectID, appID } = params;
    const { logs, retrieveingLogs } = this.props;
    const { urlChecked } = this.state;

    const formattedMemoryMetrics = this.getAppMemoryMetrics();
    const formattedCPUMetrics = this.getAppCPUMetrics();
    const formattedNetworkMetrics = this.getAppNetworkMetrics();
    const appInfo = this.getAppInfo(appID);

    return (
      <div className={styles.Page}>
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={appInfo.name}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header={appInfo.name} viewAppLink={appInfo.url} />
            </div>
            <div className={styles.ContentSection}>
              <div
                className={
                  styles.SummaryCardContainer +
                  " " +
                  styles.SummaryCardDimentions
                }
              >
                <div className={styles.CardHeaderSection}>
                  <div className={styles.CardTitle}>App Summary</div>
                </div>
                <div className={styles.CardBodySection}>
                  <div className={styles.InnerCard}>
                    <div className={styles.InnerCardSections}>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesStart}>APP NAME</div>
                        <div className={styles.InnerContentName}>
                          {appInfo.name}
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesStart}>LINK</div>
                        <div className={styles.InnerContentLink}>
                          <div className={styles.InnerContentLinkText}>
                            {appInfo.url}
                          </div>
                          <div className={styles.CopierDiv}>
                            <div className={styles.Icons}>
                              <CopyText onClick={this.copyUrl} />
                              {urlChecked === true ? <Checked /> : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.verticalLine}> </div>
                    <div className={styles.InnerCardSections}>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesMiddle}>
                          APP STATUS
                        </div>
                        <div className={styles.InnerContentStatus}>
                          <AppStatus appStatus={appInfo.status} />
                          <div>
                            {appInfo.status === "running" ? "Ready" : "Down"}
                          </div>
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesMiddle}>AGE</div>
                        <div className={styles.InnerContentAge}>
                          {appInfo.age}
                        </div>
                      </div>
                    </div>
                    <div className={styles.verticalLine}> </div>
                    <div className={styles.InnerCardSections}>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesEnd}>ALIAS</div>
                        <div className={styles.InnerContentEnd}>
                          {appInfo.alias}
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesEnd}>PORT</div>
                        <div className={styles.InnerContentEnd}>
                          {appInfo.port}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.MetricsCardsSection}>
                <Link
                  to={{
                    pathname: `/projects/${projectID}/apps/${appID}/memory/`,
                  }}
                >
                  <MetricsCard
                    icon={<MetricIcon />}
                    title="Memory"
                    className={styles.CardSizeDimensions}
                  >
                    <LineChartComponent
                      lineDataKey="memory"
                      preview
                      data={formattedMemoryMetrics}
                    />
                  </MetricsCard>
                </Link>
                <Link
                  to={{
                    pathname: `/projects/${projectID}/apps/${appID}/cpu/`,
                  }}
                >
                  <MetricsCard
                    icon={<MetricIcon />}
                    title="CPU"
                    className={styles.CardSizeDimensions}
                  >
                    <LineChartComponent
                      lineDataKey="cpu"
                      preview
                      data={formattedCPUMetrics}
                    />
                  </MetricsCard>
                </Link>
                <Link
                  to={{
                    pathname: `/projects/${projectID}/apps/${appID}/network/`,
                  }}
                >
                  <MetricsCard
                    icon={<MetricIcon />}
                    title="Network"
                    className={styles.CardSizeDimensions}
                  >
                    <LineChartComponent
                      lineDataKey="network"
                      preview
                      data={formattedNetworkMetrics}
                    />
                  </MetricsCard>
                </Link>
              </div>
              <div className={styles.LogsSection}>
                <Link
                  to={{
                    pathname: `/projects/${projectID}/apps/${appID}/logs/`,
                  }}
                >
                  <LogsFrame
                    loading={retrieveingLogs}
                    data={logs}
                    title={`${appInfo.name} logs`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { logs, retrievedLogs, retrieveingLogs } = state.appLogsReducer;

  const { isFetchingAppMemory, appMemoryMetrics, appMemoryMessage } =
    state.appMemoryReducer;

  const { isFetchingCPU, appCPUMetrics, cpuMessage } = state.appCpuReducer;

  const { appNetworkMetrics, isFetchingAppNetwork, appNetworkMessage } =
    state.appNetworkReducer;

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
    apps,
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
      projectID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMetricsPage);
