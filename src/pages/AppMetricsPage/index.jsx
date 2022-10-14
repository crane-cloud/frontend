import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Spinner from "../../components/Spinner";
import { Redirect } from "react-router-dom";
import MetricsCard from "../../components/MetricsCard";
import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";
import styles from "./AppMetricsPage.module.css";
import LineChartComponent from "../../components/LineChart";
import LogsFrame from "../../components/LogsFrame";
import getAppLogs from "../../redux/actions/getAppLogs";
import getAppMemory, { clearAppMemory } from "../../redux/actions/appMemory";
import getAppCPU from "../../redux/actions/appCPU";
import {
  formatAppMemoryMetrics,
  formatAppCPUMetrics,
  formatAppNetworkMetrics,
} from "../../helpers/formatMetrics";
import revertUrl, { clearUrlRevertState } from "../../redux/actions/revertUrl";
import getAppNetwork from "../../redux/actions/appNetwork";
import AppStatus from "../../components/AppStatus";
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
    this.regenerate = this.regenerate.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  getAppInfo(id) {
    const { apps } = this.props;
    const found = apps?.apps.find((app) => app.id === id);
    const info = {
      name: found?.name,
      status: found?.app_running_status,
      url: found?.url,
      age: found?.age,
      alias: found?.alias,
      image: found?.image,
      port: found?.port,
    };

    return info;
  }

  componentDidMount() {
    const {
      getAppLogs,
      getAppMemory,
      getAppCPU,
      getAppNetwork,
      clearUrlRevertState,
      match: { params },
    } = this.props;
    const { projectID, appID } = params;

    getAppLogs({ projectID, appID }, { timestamps: true });
    clearAppMemory();
    clearUrlRevertState();
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
  regenerate() {
    const {
      revertUrl,
      match: { params },
    } = this.props;
    revertUrl(params.appID);
  }
  renderRedirect = () => {
    const { isReverted, clearUrlRevertState } = this.props;
    if (isReverted) {
      clearUrlRevertState();
      return <Redirect to={`/projects`} noThrow />;
    }
  };

  render() {
    const { params } = this.props.match;
    const { projectID, appID } = params;
    const { logs, retrieveingLogs, isReverting, isReverted } = this.props;
    const { urlChecked } = this.state;

    const formattedMemoryMetrics = this.getAppMemoryMetrics();
    const formattedCPUMetrics = this.getAppCPUMetrics();
    const formattedNetworkMetrics = this.getAppNetworkMetrics();
    const appInfo = this.getAppInfo(appID);

    return (
      <div className={styles.Page}>
        {isReverted ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={appInfo.name}
              params={params}
              pageRoute={this.props.location?.pathname}
              allMetricsLink={`/projects/${projectID}/apps/${appID}/dashboard`}
              cpuLink={`/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className="MainContentSection">
            <div className={styles.InformationBarSection}>
              <InformationBar header={appInfo.name} viewAppLink={appInfo.url} />
            </div>
            <div className={`${styles.ContentSection} SmallContainer`}>
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
                        <div className={styles.InnerTitlesStart}>App Name</div>
                        <div className={styles.InnerContentName}>
                          {appInfo.name}
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesStart}>App Url</div>
                        {appInfo.url ? (
                          <div className={styles.InnerContentLink}>
                            <div className={styles.InnerContentLinkText}>
                              <a
                                href={appInfo.url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {appInfo.url}
                              </a>
                            </div>
                            <div className={styles.CopierDiv}>
                              <div className={styles.Icons}>
                                <CopyText onClick={this.copyUrl} />
                                {urlChecked === true ? <Checked /> : null}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {isReverting ? (
                              <Spinner />
                            ) : (
                              <div
                                className={styles.InnerContentWarnText}
                                onClick={() => {
                                  this.regenerate();
                                }}
                              >
                                Click to re-generate url
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className={styles.InnerCardSections}>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesMiddle}>
                          App Status
                        </div>
                        <div className={styles.InnerContentStatus}>
                          <AppStatus appStatus={appInfo.status} />
                          <div>
                            {appInfo.status === "running" ? "Ready" : "Down"}
                          </div>
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesMiddle}>
                          Date Deployed
                        </div>
                        <div className={styles.InnerContentAge}>
                          {appInfo.age}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className={styles.InnerCardSections}>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesEnd}>App Alias</div>
                        <div className={styles.InnerContentEnd}>
                          {appInfo.alias}
                        </div>
                      </div>
                      <div className={styles.InnerContentGrid}>
                        <div className={styles.InnerTitlesEnd}>Port</div>
                        <div className={styles.InnerContentEnd}>
                          {appInfo.port}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.MetricCardsSection}>
                <Link
                  to={{
                    pathname: `/projects/${projectID}/apps/${appID}/memory/`,
                  }}
                >
                  <MetricsCard
                    icon={<MetricIcon />}
                    title="Memory"
                    className="CardDimensions"
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
                    className="CardDimensions"
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
                    className="CardDimensions"
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

export const mapStateToProps = (state) => {
  const { logs, retrievedLogs, retrieveingLogs } = state.appLogsReducer;

  const { isFetchingAppMemory, appMemoryMetrics, appMemoryMessage } =
    state.appMemoryReducer;

  const { isFetchingCPU, appCPUMetrics, cpuMessage } = state.appCpuReducer;

  const { appNetworkMetrics, isFetchingAppNetwork, appNetworkMessage } =
    state.appNetworkReducer;

  const { apps } = state.appsListReducer;
  const { isReverting, isReverted } = state.revertUrlReducer;

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
    isReverted,
    isReverting,
  };
};

const mapDispatchToProps = {
  getAppMemory,
  clearAppMemory,
  getAppLogs,
  getAppCPU,
  getAppNetwork,
  clearUrlRevertState,
  revertUrl,
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
