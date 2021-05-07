import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideBar from '../SideBar';
import Spinner from '../Spinner';
import CreateDatabase from '../CreateDatabase';
import getProjectDatabases from '../../redux/actions/databaseList';
import tellAge from '../../helpers/ageUtility';
import './DatabaseList.css';

class DatabaseList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      openCreateComponent: false
    };
    this.state = this.initialState;
    this.getProjectName = this.getProjectName.bind(this);
    this.showCreateComponent = this.showCreateComponent.bind(this);
    this.callbackCreateComponent = this.callbackCreateComponent.bind(this);
  }

  componentDidMount() {
    const { getProjectDatabases, match: { params: { projectID } } } = this.props;
    getProjectDatabases(projectID);
  }

  componentDidUpdate(prevProps) {
    const { isCreated, getProjectDatabases, match: { params: { projectID } } } = this.props;

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
      databasesFetched
    } = this.props;
    const { openCreateComponent } = this.state;

    const { projectID, userID } = params;
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
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          {openCreateComponent ? (<CreateDatabase closeComponent={this.callbackCreateComponent} params={params} />) : (
            <div className="MainContentSection">
              <div className="InformationBarSection">
                <InformationBar
                  header="Databases"
                  showBtn
                  btnAction={this.showCreateComponent}
                />
              </div>
              <div className="ContentSection">
                <div className="DatabaseTable">
                  <div className="DatabaseTableRow">
                    <div className="DatabaseTableHeadCell DatabaseTableHead">Type</div>
                    <div className="DatabaseTableHeadCell DatabaseTableHead">Name</div>
                    <div className="DatabaseTableHeadCell DatabaseTableHead">Host</div>
                    <div className="DatabaseTableHeadCell DatabaseTableHead">Age</div>
                  </div>
                  <div>
                    {isFetchingDatabases ? (
                      <div className="DatabaseTableBody">
                        <div className="TableLoading DatabaseTableRow">
                          <div className="DatabaseTableCell">
                            <div className="SpinnerWrapper">
                              <Spinner size="big" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="DatabaseTableBody">
                        {(databasesFetched && databases !== undefined && (
                          (databases.map((database) => (
                            <Link
                              to={{
                                pathname: `/users/${userID}/projects/${projectID}/databases/${database.id}/settings`
                              }}
                              key={database.id}
                              className="DatabaseRow"
                            >
                              <div className="DatabaseTableRow" key={databases.indexOf(database)}>
                                <div className="DatabaseTableCell uppercase">{database.database_flavour_name}</div>
                                <div className="DatabaseTableCell">{database.name}</div>
                                <div className="DatabaseTableCell">{database.host}</div>
                                <div className="DatabaseTableCell">{tellAge(database.date_created)}</div>
                              </div>
                            </Link>
                          ))))
                        )}
                      </div>
                    )}
                  </div>

                  {(databasesFetched && databases.length === 0) && (
                    <div className="NoResourcesMessage">
                      You haven’t created any databases yet.
                      Click the create button to get started.
                    </div>
                  )}

                  {(!isFetchingDatabases && !databasesFetched) && (
                    <div className="NoResourcesMessage">
                      Oops! Something went wrong!
                      Failed to retrieve Databases.
                    </div>
                  )}
                </div>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectDatabases: PropTypes.func.isRequired,
  isFetchingDatabases: PropTypes.bool,
  databasesFetched: PropTypes.bool,
  isCreated: PropTypes.bool.isRequired
};

DatabaseList.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases, databasesFetched, isFetchingDatabases } = state.projectDatabasesReducer;
  const { isCreated } = state.createDatabaseReducer;
  return {
    projects,
    databases,
    isCreated,
    databasesFetched,
    isFetchingDatabases
  };
};

const mapDispatchToProps = {
  getProjectDatabases
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseList);
