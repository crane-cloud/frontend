import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InformationBar from "../InformationBar";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import BlackInputText from "../BlackInputText";
import Modal from "../Modal";
import ClustersList from "../ClustersList";
import Header from "../Header";
import addCluster, {
  clearAddClusterState,
} from "../../redux/actions/addCluster";
import userSummary from "../../redux/actions/usersSummary";
import appSummary from "../../redux/actions/appsSummary";
import Feedback from "../Feedback";
import styles from "./ClusterPage.module.css";
import getDatabases from "../../redux/actions/getDatabases";
import getClustersList from "../../redux/actions/clusters";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";

class ClusterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      host: "",
      token: "",
      openModal: false,
      error: "",
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getDatabases, getClustersList, userSummary, appSummary } = this.props;
    getDatabases();
    let details = { start: "2020-01-01", end: "2021-10-10", set_by: "month" };
    userSummary(details);
    appSummary(details);
    getClustersList();
  }

  componentDidUpdate(prevProps) {
    const { isAdded } = this.props;

    if (isAdded !== prevProps.isAdded) {
      this.hideForm();
    }
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    const { clearAddClusterState } = this.props;
    clearAddClusterState();
    this.setState({ openModal: false, error: "" });
  }

  handleChange(e) {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (error) {
      this.setState({
        error: "",
      });
    }
  }

  handleSubmit() {
    const { addCluster } = this.props;

    const { host, name, token, description } = this.state;

    // input validation
    if (!host || !name || !token || !description) {
      this.setState({
        error: "Please provide all the information",
      });
    } else {
      const cluster = {
        host,
        name,
        token,
        description,
      };

      addCluster(cluster);
    }
  }

  render() {
    const { host, token, name, description, openModal, error } = this.state;

    const {
      creatingCluster,
      isAdded,
      isFailed,
      message,
      databases,
      usersSummary,
      isFetchingUsersSummary,
      isFetchingAppsSummary,
      summary,
      clusters: {metadata}
    } = this.props;
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
              <PrimaryButton
                label="View accounts"
                className={styles.ViewAccountsBtn}
              />
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
                        label={{ value: "Time", angle: 0, position: "bottom" }}
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
                          position: "middle",
                        }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  )}
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
                      {usersSummary && summary.metadata?.total_apps}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.LeftDBSide}>
                <div className={styles.TopTitle}>Metrics</div>
                <div className={styles.MetricsGraph}>
                  {isFetchingAppsSummary ? (
                    <div className="ContentSectionSpinner">
                      <Spinner />
                    </div>
                  ) : (
                    <AreaChart
                      width={600}
                      height={300}
                      syncId="anyId"
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
                          position: "middle",
                        }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                    </AreaChart>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.Card}>
          <div className={styles.CardHeader}>Databases</div>
          <div className={styles.DBStats}>
            <div className={styles.In}>
              <div className={styles.InnerTitlesStart}>Mysql</div>
              <div className={styles.ResourceDigit}>
                {databases && databases?.dbs_stats_per_flavour?.mysql_db_count}
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
        </div>

        <div className={styles.Card}>
          <div className={styles.CardHeader}>Clusters</div>
          <div className={styles.CardTop}>Count</div>
          <div className={styles.ResourceDigit}>{metadata.cluster_count}</div>
        </div>

        <div className="TopRow">
          <InformationBar
            header="Select Infrastructure"
            showBtn
            btnAction={this.showForm}
          />
        </div>
        <div className="MainRow">
          <ClustersList newClusterAdded={isAdded} />
        </div>
        <div className="FooterRow">
          <p>
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </p>
        </div>

        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal} onClickAway={this.hideForm}>
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
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  required
                  placeholder="Token"
                  name="token"
                  value={token}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  required
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />

                {error && <Feedback type="error" message={error} />}

                <div className="ModalFormButtons AddAddButtons">
                  <PrimaryButton
                    label="cancel"
                    className="CancelBtn"
                    onClick={this.hideForm}
                  />
                  <PrimaryButton
                    label={creatingCluster ? <Spinner /> : "add"}
                    onClick={this.handleSubmit}
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
  }
}

ClusterPage.propTypes = {
  addCluster: PropTypes.func.isRequired,
  clearAddClusterState: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  creatingCluster: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
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
