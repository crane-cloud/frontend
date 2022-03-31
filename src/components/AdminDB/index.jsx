import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header";
import InformationBar from "../InformationBar";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import SideNav from "../SideNav";
import Spinner from "../Spinner";
import Status from "../Status";
import CreateAdminDB from "./CreateAdminDB";
import adminGetDatabases from "../../redux/actions/getAdminDatabases";
import styles from "./AdminDB.module.css";

class AdminDBList extends React.Component {
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
    const { adminGetDatabases } = this.props;
    adminGetDatabases();
  }

  componentDidUpdate(prevProps) {
    const { isCreated, adminGetDatabases } = this.props;

    if (isCreated !== prevProps.isCreated) {
      adminGetDatabases();
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
    const { databases, isFetchingDatabases, databasesFetched } = this.props;
    const { openCreateComponent } = this.state;

    const sortedDbs = databases.sort((a, b) =>
      b.date_created > a.date_created ? 1 : -1
    );
    const clusterName = localStorage.getItem("clusterName");
    return (
      <div className={styles.MainPage}>
        <div className="TopBarSection">
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={"123"} />
          </div>
          {openCreateComponent ? (
            <CreateAdminDB closeComponent={this.callbackCreateComponent} />
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
                  <div className={styles.NoResourcesMessageSection}>
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
                      {databasesFetched &&
                        sortedDbs !== undefined &&
                        sortedDbs.map((database, index) => (
                          <div className={styles.DatabaseBody} key={index}>
                            <div
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
                            </div>
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
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

AdminDBList.propTypes = {
  databases: PropTypes.arrayOf(PropTypes.shape({})),
  getProjectDatabases: PropTypes.func.isRequired,
  isFetchingDatabases: PropTypes.bool,
  databasesFetched: PropTypes.bool,
  isCreated: PropTypes.bool.isRequired,
};

AdminDBList.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

const mapStateToProps = (state) => {
  const { databases, databasesFetched, isFetchingDatabases } =
    state.adminDatabasesReducer;
  const { isCreated } = state.adminCreateDBReducer;
  return {
    databases,
    isCreated,
    databasesFetched,
    isFetchingDatabases,
  };
};

const mapDispatchToProps = {
  adminGetDatabases,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDBList);
