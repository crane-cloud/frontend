import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProjectsList.css';
import InformationBar from '../InformationBar';
import Header from '../Header';
import getUserProjects from '../../redux/actions/projectsList';
import Spinner from '../Spinner';
import ClusterCard from '../ClusterCard';
import crane from '../../assets/images/craneLogo.png';

class UserProjectsPage extends React.Component {
  componentDidMount() {
    const { getUserProjects, data } = this.props;
    getUserProjects(data.id);
  }

  render() {
    const { projects, isRetrieving, data } = this.props;
    const userId = data.id;
    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBar header="Projects" showBtn />
        </div>
        <div className="MainRow">
          <div className="ProjectList">
            {
              isRetrieving ? (
                <div className="TableLoading">
                  <div className="SpinnerWrapper">
                    <Spinner size="big" />
                  </div>
                </div>
              ) : (
                <div className="ProjectList">
                  { projects.length !== 0 ? (
                    projects.map((project) => (
                      <Link to={{ pathname: `/users/${userId}/projects/${project.id}/apps` }} key={project.id}>
                        <div key={project.id} className="ProjectCardItem">
                          <ClusterCard
                            name={project.name}
                            description={project.alias}
                            icon={crane}
                          />
                        </div>
                      </Link>
                    )))
                    : (
                      <div className="NoContentDiv">
                        You haven’t created any projects yet.
                        Click the create button to get started.
                      </div>
                    )}
                </div>
              )
            }
          </div>
        </div>
        <div className="FooterRow">
          <p>
            Copyright © 2020 Crane Cloud.
            <br />
            All Rights Reserved.
          </p>
        </div>
      </div>
    );
  }
}

UserProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool
};

UserProjectsPage.defaultProps = {
  projects: [],
  isRetrieving: false
};

const mapStateToProps = (state) => {
  const { isRetrieving, projects } = state.userProjectsReducer;
  const { data } = state.user;
  return { isRetrieving, projects, data };
};

const mapDispatchToProps = {
  getUserProjects
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
