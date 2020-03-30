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
import ClusterCard from '../ClusterCard';
import { BigSpinner } from '../SpinnerComponent';
import crane from '../../assets/images/plant.svg';

class AdminProjectsPage extends React.Component {
  componentDidMount() {
    const { getAdminProjects } = this.props;
    getAdminProjects();
  }

  render() {
    const { projects, isRetrieving } = this.props;
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
                        <Link to={{ pathname: `/projects/${project.id}` }} key={project.id}>
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
            </div>
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
