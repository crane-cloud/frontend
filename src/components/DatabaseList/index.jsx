import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import Spinner from "../Spinner";
import Status from "../Status";
import CreateDatabase from "../CreateDatabase";
import getProjectDatabases from "../../redux/actions/databaseList";
import styles from "./DatabaseList.module.css";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getProjectName } from "../../helpers/projectName";

class DatabaseList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      openCreateComponent: false,
    };
    this.state = this.initialState;
    this.showCreateComponent = this.showCreateComponent.bind(this);
    this.callbackCreateComponent = this.callbackCreateComponent.bind(this);
  }

  componentDidMount() {
    const {
      getProjectDatabases,
      match: {
        params: { projectID },
      },
    } = this.props;
    getProjectDatabases(projectID);
  }

  componentDidUpdate(prevProps) {
    const {
      isCreated,
      getProjectDatabases,
      match: {
        params: { projectID },
      },
    } = this.props;

    if (isCreated !== prevProps.isCreated) {
      getProjectDatabases(projectID);
      this.callbackCreateComponent();
    }
  }

  showCreateComponent() {
    this.setState({ openCreateComponent: true });
  }

  callbackCreateComponent() {
    this.setState({ openCreateComponent: false });
  }

  render() {
    const {
      match: { params },
      databases,
      isFetchingDatabases,
      projects,
      databasesFetched,
    } = this.props;
    const { openCreateComponent } = this.state;

    const { projectID } = params;
    const sortedDbs = [...databases]?.sort((a, b) =>
      b.date_created > a.date_created ? 1 : -1
    );
    return (
      <div>
        {openCreateComponent ? (
          <DashboardLayout
            header="Create Database"
            showBtn
            buttontext="close"
            btnAction={this.callbackCreateComponent}
            btntype="close"
            name={getProjectName(projects, params.projectID)}
          >
            <CreateDatabase params={params} />
          </DashboardLayout>
        ) : (
          <DashboardLayout
            header="Databases"
            showBtn
            buttontext="+ new database"
            btnAction={this.showCreateComponent}
            name={getProjectName(projects, params.projectID)}
          >
            {isFetchingDatabases ? (
              <div className={styles.NoResourcesMessageSection}>
                <div className={styles.SpinnerWrapper}>
                  <Spinner size="big" />
                </div>
              </div>
            ) : (
              databasesFetched &&
              databases.length > 0 && (
                <div className={`${styles.DatabaseTable} MetricsCardContainer`}>
                  <div
                    className={`${styles.DatabaseTableRow} CardHeaderSection`}
                  >
                    <div className={styles.DatabaseTableHead}>Type</div>
                    <div className={styles.DatabaseTableHead}>Name</div>
                    <div className={styles.DatabaseTableHead}>Host</div>
                    <div className={styles.DatabaseTableHead}>Status</div>
                    <div className={styles.DatabaseTableHead}>Age</div>
                  </div>
                  {databasesFetched &&
                    sortedDbs !== undefined &&
                    sortedDbs.map((database, index) => (
                      <div className={styles.DatabaseBody} key={index}>
                        <Link
                          to={{
                            pathname: `/projects/${projectID}/databases/${database.id}/settings`,
                          }}
                          key={database.id}
                          className={styles.DatabaseTableRow}
                        >
                          <div className={styles.DatabaseTableCell}>
                            {database.database_flavour_name}
                          </div>
                          <div className={styles.DatabaseTableCell}>
                            {database.name}
                          </div>
                          <div className={styles.DatabaseTableCell}>
                            {database.host}
                          </div>
                          <div className={styles.DatabaseTableCell}>
                            <Status status={database.db_status} />
                          </div>
                          <div className={styles.DatabaseTableCell}>
                            {database.age}
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              )
            )}

            {databasesFetched && databases.length === 0 && (
              <div className={styles.NoResourcesMessageSection}>
                <div className={styles.NoResourcesMessage}>
                  You haven’t created any databases yet.
                </div>
                <br></br>
                <div className={styles.NoResourcesMessage}>
                  Click the &nbsp;{" "}
                  <ButtonPlus
                    className={styles.ButtonPlusSmall}
                    onClick={this.showCreateComponent}
                  />{" "}
                  &nbsp; button to create one.
                </div>
              </div>
            )}

            {!isFetchingDatabases && !databasesFetched && (
              <div className={styles.NoResourcesMessage}>
                Oops! Something went wrong! Failed to retrieve Databases.
              </div>
            )}
          </DashboardLayout>
        )}
      </div>
    );
  }
}

DatabaseList.propTypes = {
  databases: PropTypes.arrayOf(PropTypes.shape({})),
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  getProjectDatabases: PropTypes.func,
  isFetchingDatabases: PropTypes.bool,
  databasesFetched: PropTypes.bool,
  isCreated: PropTypes.bool,
};

DatabaseList.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

export const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases, databasesFetched, isFetchingDatabases } =
    state.projectDatabasesReducer;
  return {
    projects,
    databases,
    databasesFetched,
    isFetchingDatabases,
  };
};

const mapDispatchToProps = {
  getProjectDatabases,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseList);