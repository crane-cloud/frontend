import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './AdminProjectsPage.css';
import InformationBar from '../InformationBar';
import NavBar from '../NavBar';
import getUserProjects from '../../redux/actions/userProjectsActions';
import { BigSpinner } from '../SpinnerComponent';

class UserProjectsPage extends React.Component {
  componentDidMount() {
    const { getUserProjects } = this.props;
    const userID = localStorage.getItem('userID');
    getUserProjects(userID);
  }

  render() {
    const { projects, isRetrieving } = this.props;

    return (
      <div className="Page">
        <div className="TopRow">
          <NavBar />
          <InformationBar header="Projects" showBtn={true} />
        </div>
        <div className="MainRow">
          <div className="ProjectList">
            {isRetrieving ? (projects.map((project) => (
              <div key={project.id} className="ProjectCardItem">
                <ClusterCard name={project.name} description={project.host} icon={crane} />
              </div>
            ))) : (
              <h3 className="EmptyList">No Projects Yet.</h3>
            )}
          </div>
        </div>
        <div className="FooterRow">
          <p>
            Copyright © 2020 Crane Cloud.
            All Rights Reserved.

          </p>
        </div>
      </div>
    );
  }
}

UserProjectsPage.propTypes = {
  projects: PropTypes.object,
  isRetrieving: PropTypes.bool
};

UserProjectsPage.defaultProps = {
  projects: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, projects } = state.UserProjectsReducer;
  return { isRetrieving, projects };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserProjects
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
