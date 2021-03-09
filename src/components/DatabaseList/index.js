import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideBar from '../SideBar';
import Status from '../Status';
import Spinner from '../Spinner';
import getProjectDatabases from '../../redux/actions/databaseList';
import './DatabaseList.css';


const databasesList = [
  {
    type: 'PostgreSQL',
    name: 'AirQo-users',
    size: 0.1,
    status: true,
    time: '28 seconds ago'
  },
  {
    type: 'MYSQL',
    name: 'AirQo-devices',
    size: 32,
    status: false,
    time: '4 days ago'
  },
  {
    type: 'PostgreSQL',
    name: 'VotingApp-db',
    size: 5,
    status: true,
    time: '5 minutes ago'
  },
];

class DatabaseList extends React.Component {
  constructor(props) {
    super(props);
    this.getProjectName = this.getProjectName.bind(this);
  }

  componentDidMount() {
    const { getProjectDatabases } = this.props;
    getProjectDatabases();
  }

  getProjectName(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.name;
  }

  render() {
    const isRetrieving = false;
    const isFetched = true;
    const {
      match: { params },
      projects,
      databases
    } = this.props;

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
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Databases" showBtn />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? 'ResourcesTable LoadingResourcesTable'
                    : 'ResourcesTable'
                }
              >
                <div className="DatabaseTable">
                  <div className="DatabaseTableHead">
                    <div className="DatabaseTableRow">
                      <div className="DatabaseTableHeadCell">Name</div>
                      <div className="DatabaseTableHeadCell">Type</div>
                      <div className="DatabaseTableHeadCell">Size</div>
                      <div className="DatabaseTableHeadCell">Status</div>
                      <div className="DatabaseTableHeadCell">Age</div>
                    </div>
                  </div>
                  {isRetrieving ? (
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
                      {isFetched
                        && databasesList !== undefined
                        && databasesList.map((database) => (
                          <div className="DatabaseTableRow" key={databasesList.indexOf(database)}>
                            <div className="DatabaseTableCell">{database.name}</div>
                            <div className="DatabaseTableCell">{database.type}</div>
                            <div className="DatabaseTableCell">{database.size}</div>
                            <div className="DatabaseTableCell">
                              <Status status={database.status} />
                            </div>
                            <div className="DatabaseTableCell">{database.time}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {(isFetched && databases.length === 0) && (
                  <div className="NoResourcesMessage">
                    <p>No Databases Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Somediving went wrong! Failed to retrieve Databases.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatabaseList.propTypes = {
  isCreated: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired,
  createApp: PropTypes.func.isRequired,
  errorCode: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DatabaseList.defaultProps = {
  errorCode: null
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases } = state.projectDatabasesReducer;
  return {
    projects,
    databases,
  };
};

const mapDispatchToProps = {
  getProjectDatabases
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseList);
