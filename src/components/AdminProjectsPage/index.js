import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './AdminProjectsPage.css';
import InformationBar from '../InformationBar';
import Header from '../Header';
import SideNav from '../SideNav';
import getAdminProjects from '../../redux/actions/AdminProjectsActions';
import { BigSpinner } from '../SpinnerComponent';

class AdminProjectsPage extends React.Component {
  componentDidMount() {
    const { getAdminProjects } = this.props;
    getAdminProjects();
  }

  render() {
    const { projects, isRetrieving, isRetrieved } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    const { match: { params } } = this.props;
    console.log(projects);

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
              <div className="ResourcesTable">
                <table>
                  <thead className="uppercase">
                    <tr>
                      <th>name</th>
                      <th>owner</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  {isRetrieving ? (
                    <tr className="TableLoading">
                      <div className="SpinnerWrapper">
                        <BigSpinner />
                      </div>
                    </tr>
                  ) : (
                    <tbody>
                      {(projects !== 0 && projects !== undefined) && (
                        projects.map((project) => (
                          <tr>
                            <td>{project.name}</td>
                            <td>{project.owner_id}</td>
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
  isRetrieving: PropTypes.bool
};

AdminProjectsPage.defaultProps = {
  projects: [],
  isRetrieved: false,
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, projects, isRetrieved } = state.AdminProjectsReducer;
  return { isRetrieving, projects, isRetrieved };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAdminProjects
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProjectsPage);
