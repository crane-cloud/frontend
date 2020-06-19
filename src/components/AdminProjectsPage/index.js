import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AdminProjectsPage.css';
import InformationBar from '../InformationBar';
import Header from '../Header';
import SideNav from '../SideNav';
import getAdminProjects from '../../redux/actions/adminProjects';
import getUsersList from '../../redux/actions/users';
import Spinner from '../Spinner';

class AdminProjectsPage extends React.Component {
  componentDidMount() {
    const { getAdminProjects, getUsersList } = this.props;
    getAdminProjects();
    getUsersList();
  }

  getUserName(userId) {
    let username = '';
    const { users, isFetched } = this.props;
    if (isFetched) {
      users.map((user) => {
        if (userId === user.id) {
          username = user.name;
        }
        return null;
      });
    }
    return username;
  }

  render() {
    const { projects, isRetrieving, isRetrieved } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    const { match: { params } } = this.props;

    return (
      <div className="MainPage">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Projects" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className={isRetrieving ? 'ResourcesTable LoadingResourcesTable' : 'ResourcesTable'}>
                <table>
                  <thead className="uppercase">
                    <tr>
                      <th>name</th>
                      <th>owner</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  {isRetrieving ? (
                    <tbody>
                      <tr className="TableLoading">
                        <td>
                          <div className="SpinnerWrapper">
                            <Spinner size="big" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {(projects !== 0 && projects !== undefined) && (
                        projects.map((project) => (
                          <tr key={projects.indexOf(project)}>
                            <td>{project.name}</td>
                            <td>
                              { this.getUserName(project.owner_id)}
                            </td>
                            <td>{project.description}</td>
                          </tr>
                        )))}
                    </tbody>
                  )}
                </table>
                {(isRetrieved && projects.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No projects available</p>
                  </div>
                )}
                {(!isRetrieving && !isRetrieved) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!
                      Failed to retrieve projects.
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


AdminProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  isFetched: PropTypes.bool,
  getAdminProjects: PropTypes.func.isRequired,
  getUsersList: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

AdminProjectsPage.defaultProps = {
  projects: [],
  isRetrieved: false,
  isRetrieving: false,
  users: [],
  isFetched: false
};


const mapStateToProps = (state) => {
  const { isRetrieving, projects, isRetrieved } = state.adminProjectsReducer;
  const { users, isFetched } = state.usersListReducer;
  return {
    isRetrieving, projects, isRetrieved, users, isFetched
  };
};

const mapDispatchToProps = {
  getAdminProjects, getUsersList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProjectsPage);
