import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InformationBar from "../../components/InformationBar";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import BlackInputText from "../../components/BlackInputText";
import Modal from "../../components/Modal";
import ClustersList from "../../components/ClustersList";
import Header from "../../components/Header";
import addCluster, {
  clearAddClusterState,
} from "../../redux/actions/addCluster";
import userSummary from "../../redux/actions/usersSummary";
import appSummary from "../../redux/actions/appsSummary";
import Feedback from "../../components/Feedback";
import styles from "./ClusterPage.module.css";
import getDatabases from "../../redux/actions/getDatabases";
import getClustersList from "../../redux/actions/clusters";
import { Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";
import MetricsCard from "../../components/MetricsCard";
import AdminPeriod from "../../components/AdminPeriod";
import {
  currentDate,
  // fourMonthbackdate,
  // threeMonthbackdate,
  // eightMonthbackdate,
  getBackDate,
  twoYearBack,
  oneYearBack,
} from "../../helpers/dateConstants";

const ClusterPage = ({
  getDatabases,
  userSummary,
  appSummary,
  creatingCluster,
  isAdded,
  isFailed,
  addCluster,
  message,
  databases,
  usersSummary,
  summary,
  isFetchingAppsSummary,
  isFetchingUsersSummary,
  clearAddClusterState,
  clusters,
}) => {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [begin, setBegin] = useState("");
  const [prometheus_url, setPrometheus_url] = useState("");

  useEffect(() => {
    let details = { begin: "2021-03-01", end: currentDate, set_by: "month" };
    userSummary(details);
    appSummary(details);
    getClustersList();
    getDatabases();
  }, [userSummary, appSummary, getDatabases]);

  const showForm = () => setOpenModal(true);

  const hideForm = () => {
    clearAddClusterState();
    setOpenModal(false);
  };
  const handlePeriodChange = async (period) => {
    let startTimeStamp;
    const threeMonthbackdate = getBackDate(3);
    const fourMonthbackdate = getBackDate(4);
    const eightMonthbackdate = getBackDate(8);

    if (period === "3m") {
      startTimeStamp = threeMonthbackdate;
    } else if (period === "4m") {
      startTimeStamp = fourMonthbackdate;
    } else if (period === "8m") {
      startTimeStamp = eightMonthbackdate;
    } else if (period === "1y") {
      startTimeStamp = oneYearBack;
    } else if (period === "2y") {
      startTimeStamp = twoYearBack;
    } else if (period === "all") {
      startTimeStamp = "2018-01-01";
    }

    await setBegin(startTimeStamp);

    userSummary({ end: currentDate, set_by: "month", start: begin });
  };

  const appsHandlePeriodChange = async (period) => {
    let startTimeStamp;

    if (period === "3m") {
      startTimeStamp = getBackDate(3);
    } else if (period === "4m") {
      startTimeStamp = getBackDate(4);
    } else if (period === "8m") {
      startTimeStamp = getBackDate(8);
    } else if (period === "1y") {
      startTimeStamp = oneYearBack;
    } else if (period === "2y") {
      startTimeStamp = twoYearBack;
    } else if (period === "all") {
      startTimeStamp = "2018-01-01";
    }

    await setBegin(startTimeStamp);
    appSummary({ end: currentDate, set_by: "month", start: begin });
  };

  const handleSubmit = () => {
    // input validation
    if (!host || !name || !token || !description || !prometheus_url) {
      setError("Please provide all the information");
    } else {
      const cluster = {
        host,
        name,
        token,
        description,
        prometheus_url,
      };

      addCluster(cluster);
    }
  };

  return (
    <div className={styles.Page}>
      <div className="TopRow">
        <Header />
        <InformationBar header="Overview" />
      </div>

      <div className={styles.ContentSection}>
        <div
          className={
            styles.SummaryCardContainer + " " + styles.SummaryCardDimentions
          }
        >
          <div className={styles.CardHeaderSection}>
            <div className={styles.CardTitle}>Users</div>
            <Link to="/accounts">
              <PrimaryButton
                label="View accounts"
                className={styles.ViewAccountsBtn}
              />
            </Link>
          </div>
          <div className={styles.UserSection}>
            <div className={styles.LeftUserSide}>
              <div className={styles.TopTitle}>Count</div>
              <div>
                <div>
                  <div className={styles.ResourceDigit}>
                    {usersSummary && usersSummary.metadata?.total_users}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.LeftDBSide}>
              <div className={styles.TopTitle}>Metrics</div>
              <div className={styles.MetricsGraph}>
                <MetricsCard
                  className="ClusterMetricsCardGraph"
                  title={<AdminPeriod onChange={handlePeriodChange} />}
                >
                  {isFetchingUsersSummary ? (
                    <div className="ContentSectionSpinner">
                      <Spinner />
                    </div>
                  ) : (
                    <AreaChart
                      width={600}
                      height={300}
                      syncId="anyId"
                      data={usersSummary?.graph_data}
                    >
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="month" xAxisId={0} />
                      <XAxis
                        xAxisId={1}
                        dx={10}
                        label={{
                          value: "Time",
                          angle: 0,
                          position: "bottom",
                        }}
                        interval={12}
                        dataKey="year"
                        tickLine={false}
                        tick={{ fontSize: 12, angle: 0 }}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <YAxis
                        label={{
                          value: "Number of Users",
                          angle: 270,
                          position: "outside",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  )}
                </MetricsCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ContentSection}>
        <div
          className={
            styles.SummaryCardContainer + " " + styles.SummaryCardDimentions
          }
        >
          <div className={styles.CardHeaderSection}>
            <div className={styles.CardTitle}>Apps</div>
            <PrimaryButton
              label="View apps"
              className={styles.ViewAccountsBtn}
            />
          </div>
          <div className={styles.DBSection}>
            <div className={styles.LeftUserSide}>
              <div className={styles.TopTitle}>Count</div>
              <div>
                <div>
                  <div className={styles.ResourceDigit}>
                    {usersSummary && summary?.metadata?.total_apps}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.LeftDBSide}>
              <div className={styles.TopTitle}>Metrics</div>
              <div className={styles.MetricsGraph}>
                <MetricsCard
                  className="ClusterMetricsCardGraph"
                  title={<AdminPeriod onChange={appsHandlePeriodChange} />}
                >
                  {isFetchingAppsSummary ? (
                    <div className="ContentSectionSpinner">
                      <Spinner />
                    </div>
                  ) : (
                    <AreaChart
                      width={600}
                      height={300}
                      syncId="anyId"
                      position="outside"
                      data={summary?.graph_data}
                    >
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="month" xAxisId={0} />
                      <XAxis
                        xAxisId={1}
                        dx={10}
                        label={{ value: "Time", angle: 0, position: "bottom" }}
                        interval={12}
                        dataKey="year"
                        tickLine={false}
                        tick={{ fontSize: 12, angle: 0 }}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <YAxis
                        label={{
                          value: "Number of Apps",
                          angle: 270,
                          position: "outside",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  )}
                </MetricsCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.OtherCards}>
        <Link className={styles.Card}>
          <>
            <div className={styles.CardHeader}>Projects</div>
            <div className={styles.DBStats}>
              <div className={styles.In}>
                <div className={styles.InnerTitlesStart}>Active</div>
                <div className={styles.ResourceDigit}>50</div>
              </div>
              <div className={styles.verticalLine}></div>
              <div className={styles.In}>
                <div className={styles.InnerTitlesMiddle}>Disabled</div>
                <div className={styles.ResourceDigit}>0</div>
              </div>
            </div>
          </>
        </Link>
        <Link to="/databases" className={styles.Card}>
          <>
            <div className={styles.CardHeader}>Databases</div>
            <div className={styles.DBStats}>
              <div className={styles.In}>
                <div className={styles.InnerTitlesStart}>Mysql</div>
                <div className={styles.ResourceDigit}>
                  {databases &&
                    databases?.dbs_stats_per_flavour?.mysql_db_count}
                </div>
              </div>
              <div className={styles.verticalLine}></div>
              <div className={styles.In}>
                <div className={styles.InnerTitlesMiddle}>Postgresql</div>
                <div className={styles.ResourceDigit}>
                  {databases &&
                    databases.dbs_stats_per_flavour?.postgres_db_count}
                </div>
              </div>
            </div>
          </>
        </Link>
        <div className={styles.Card}>
          <div className={styles.CardHeader}>Clusters</div>
          <div className={styles.CardTop}>Count</div>
          <div className={styles.ResourceDigit}>
            {clusters.metadata?.cluster_count}
          </div>
        </div>
      </div>

      <div className="TopRow">
        <InformationBar
          header="Select Infrastructure"
          showBtn
          btnAction={showForm}
        />
      </div>
      <div className="MainRow">
        <ClustersList newClusterAdded={isAdded} />
      </div>
      <div className="FooterRow">
        <p>
          Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
        </p>
      </div>

      {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
      <Modal showModal={openModal} onClickAway={hideForm}>
        <div className="ModalForm">
          <div className="ModalFormHeading">
            <h2>Add a cluster</h2>
          </div>
          <div className="ModalFormInputs">
            <div className="ModalFormInputsBasic">
              <BlackInputText
                required
                placeholder="Host"
                name="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Prometheus Url"
                name="prometheus_url"
                value={prometheus_url}
                onChange={(e) => setPrometheus_url(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {error && <Feedback type="error" message={error} />}

              <div className="ModalFormButtons AddAddButtons">
                <PrimaryButton
                  label="cancel"
                  className="CancelBtn"
                  onClick={hideForm}
                />
                <PrimaryButton
                  label={creatingCluster ? <Spinner /> : "add"}
                  onClick={handleSubmit}
                />
              </div>

              {(isFailed || isAdded) && (
                <Feedback
                  type={isAdded ? "success" : "error"}
                  message={message}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const mapStateToProps = (state) => {
  const { isFetchingDatabases, databasesFetched, databases } =
    state.databasesReducer;
  const { creatingCluster, isAdded, isFailed, errorOccured, message } =
    state.addClusterReducer;
  const { user } = state.user;
  const { summary, FetchedAppsSummary, isFetchingAppsSummary } =
    state.appsSummaryReducer;
  const { usersSummary, FetchedUsersSummary, isFetchingUsersSummary } =
    state.usersSummaryReducer;
  const { clusters } = state.clustersReducer;

  return {
    isFetchingDatabases,
    databasesFetched,
    databases,
    user,
    creatingCluster,
    isAdded,
    isFailed,
    errorOccured,
    message,
    summary,
    FetchedAppsSummary,
    isFetchingAppsSummary,
    usersSummary,
    FetchedUsersSummary,
    isFetchingUsersSummary,
    clusters,
  };
};

const mapDispatchToProps = {
  getDatabases,
  addCluster,
  clearAddClusterState,
  appSummary,
  userSummary,
  getClustersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClusterPage);
