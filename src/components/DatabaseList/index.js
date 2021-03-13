import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideBar from '../SideBar';
import Spinner from '../Spinner';
import CreateDatabase, { clearDatabaseCreateState } from '../CreateDatabase';
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
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getProjectDatabases, match: { params: { projectID } } } = this.props;
    getProjectDatabases(projectID);
  }

  componentDidUpdate(prevProps) {
    const { isCreated } = this.props;

    if (isCreated !== prevProps.isCreated) {
      this.hideForm();
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { isCreated } = this.props;

  //   if (isCreated !== prevProps.isCreated) {
  //     this.hideForm();
  //   }
  // }

  getProjectName(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.name;
  }

  showCreateComponent() {
    this.setState({ openCreateComponent: true });
  }

  // hideCreateComponent() {
  //   const { clearDatabaseCreateState } = this.props;
  //   clearDatabaseCreateState();
  //   this.setState(this.initialState);
  // }
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
          {openCreateComponent ? (<CreateDatabase closeComponent={this.callbackCreateComponent} />) : (
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
                    <div className="DatabaseTableHeadCell DatabaseTableHead">User</div>
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
                            <div className="DatabaseTableRow" key={databases.indexOf(database)}>
                              <div className="DatabaseTableCell">{database.user}</div>
                              <div className="DatabaseTableCell">{database.name}</div>
                              <div className="DatabaseTableCell">{database.host}</div>
                              <div className="DatabaseTableCell">{tellAge(database.date_created)}</div>
                            </div>
                          ))))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {(databasesFetched && databases.length === 0) && (
                  <div className="NoResourcesMessage">
                    <p>No Databases Available</p>
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
};

DatabaseList.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases, databasesFetched, isFetchingDatabases } = state.projectDatabasesReducer;
  return {
    projects,
    databases,
    databasesFetched,
    isFetchingDatabases
  };
};

const mapDispatchToProps = {
  getProjectDatabases
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseList);
