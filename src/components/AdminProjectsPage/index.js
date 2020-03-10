import React from 'react';
import './AdminProjectsPage.css';
import InformationBar from '../InformationBar';
import NavBar from '../NavBar';

class AdminProjectsPage extends React.Component {
  render() {
    const { projects, isRetrieving } = this.props;

    return (
      <div className="Page">
        <div className="TopRow">
          <NavBar />
          <InformationBar header="Projects" showBtn={true} />
        </div>
        <div className="MainRow">
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

AdminProjectsPage.propTypes = {
  projects: PropTypes.object,
  isRetrieving: PropTypes.bool
};

AdminProjectsPage.defaultProps = {
  projects: [],
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { isRetrieving, projects } = state.adminProjectsReducer;
  return { isRetrieving, projects };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAdminProjects
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProjectsPage);
