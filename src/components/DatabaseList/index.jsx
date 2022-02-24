import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Header";
import InformationBar from "../InformationBar";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import SideBar from "../SideBar";
import Spinner from "../Spinner";
import Status from "../Status";
import CreateDatabase from "../CreateDatabase";
import getProjectDatabases from "../../redux/actions/databaseList";
import styles from "./DatabaseList.module.css";

class DatabaseList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      openCreateComponent: false,
    };
    this.state = this.initialState;
    this.getProjectName = this.getProjectName.bind(this);
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

  getProjectName(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.name;
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
      projects,
      databases,
      isFetchingDatabases,
      databasesFetched,
    } = this.props;
    const { openCreateComponent } = this.state;

    const { projectID } = params;
    const sortedDbs = databases.sort((a, b) =>
      b.date_created > a.date_created ? 1 : -1
    );
    return (
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projects, params.projectID)}
              params={params}
              description={this.getProjectName(projects, params.projectID)}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/projects/${projectID}/metrics`}
              cpuLink={`/projects/${projectID}/cpu/`}
              memoryLink={`/projects/${projectID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/network/`}
            />
          </div>
          {openCreateComponent ? (
            <CreateDatabase
              closeComponent={this.callbackCreateComponent}
              params={params}
            />
          ) : (
            <div className={styles.MainContentSection}>
              <div className={styles.InformationBarSection}>
                <InformationBar
                  header="Databases"
                  showBtn
                  btnAction={this.showCreateComponent}
                />
              </div>
              <div className={styles.ContentSection}>
                {isFetchingDatabases ? (
                  <div className={styles.NoResourcesMessage}>
                    <div className={styles.SpinnerWrapper}>
                      <Spinner size="big" />
                    </div>
                  </div>
                ) : (
                  databasesFetched &&
                  databases.length > 0 && (
                    <div
                      className={`${styles.DatabaseTable} MetricsCardContainer`}
                    >
                      <div
                        className={`${styles.DatabaseTableRow} CardHeaderSection`}
                      >
                        <div className={styles.DatabaseTableHead}>Type</div>
                        <div className={styles.DatabaseTableHead}>Name</div>
                        <div className={styles.DatabaseTableHead}>Host</div>
                        <div className={styles.DatabaseTableHead}>Status</div>
                        <div className={styles.DatabaseTableHead}>Age</div>
                      </div>
                      {
                        databasesFetched &&
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
                  <div className={styles.NoResourcesMessage}>
                    You haven’t created any databases yet. Click the &nbsp;{" "}
                    <ButtonPlus className={styles.ButtonPlusSmall} onClick={this.showCreateComponent} /> &nbsp;
                    button to create one.
                  </div>
                )}

                {!isFetchingDatabases && !databasesFetched && (
                  <div className={styles.NoResourcesMessage}>
                    Oops! Something went wrong! Failed to retrieve Databases.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DatabaseList.propTypes = {
  databases: PropTypes.arrayOf(PropTypes.shape({})),
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectDatabases: PropTypes.func.isRequired,
  isFetchingDatabases: PropTypes.bool,
  databasesFetched: PropTypes.bool,
  isCreated: PropTypes.bool.isRequired,
};

DatabaseList.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases, databasesFetched, isFetchingDatabases } =
    state.projectDatabasesReducer;
  const { isCreated } = state.createDatabaseReducer;
  return {
    projects,
    databases,
    isCreated,
    databasesFetched,
    isFetchingDatabases,
  };
};

const mapDispatchToProps = {
  getProjectDatabases,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseList);
