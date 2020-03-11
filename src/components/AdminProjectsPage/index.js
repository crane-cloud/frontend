import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './AdminProjectsPage.css';
import InformationBar from '../InformationBar';
import NavBar from '../NavBar';
import getAdminProjects from '../../redux/actions/AdminProjectsActions';
import ClusterCard from '../ClusterCard';
import { BigSpinner } from '../SpinnerComponent';
import crane from '../../assets/images/craneLogo.png';

class AdminProjectsPage extends React.Component {
  componentDidMount() {
    const { getAdminProjects } = this.props;
    getAdminProjects();
  }

  render() {
    const { projects, isRetrieving } = this.props;
    console.log(projects);

    return (
      <div className="Page">
        <div className="TopRow">
          <NavBar />
          <InformationBar header="Projects" showBtn={true} />
        </div>
        <div className="MainRow">
          <div className="ProjectList">
            {
              isRetrieving ? (
                <div className="TableLoading">
                  <div className="SpinnerWrapper">
                    <BigSpinner />
                  </div>
                </div>
              ) : (
                <div className="ProjectList">
                  { projects !== 0 ? (projects.map((project) => (
                    <Link to={{ pathname: `/projects/${project.id}`}} key={project.id}>
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
                      <h3 className="EmptyList">No Projects Yet.</h3>
                    )
                  }
                </div>
              )
            }
          </div>
          <div className="FooterRow">
            <p>
              Copyright © 2020 Crane Cloud.
              All Rights Reserved.

            </p>
          </div>
        </div>
      </div>
    );
  }
}


AdminProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool
};

AdminProjectsPage.defaultProps = {
  projects: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, projects } = state.AdminProjectsReducer;
  return { isRetrieving, projects };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAdminProjects
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProjectsPage);
