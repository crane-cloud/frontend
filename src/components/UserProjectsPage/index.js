import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './UserProjectsPage.css';
import InformationBar2 from '../InformationBar2';
import Header from '../Header';
import getUserProjects from '../../redux/actions/userProjectsActions';
import { BigSpinner } from '../SpinnerComponent';
import ClusterCard from '../ClusterCard';
import crane from '../../assets/images/craneLogo.png';
import Modal from '../Modal';
import PrimaryButton from '../PrimaryButton';
import InputText from '../InputText';
import CreateButton from '../ButtonComponent';
// import AddProjectForm from '../AddProject';
import availableClusters from '../../helpers/allClusters.js';


let todaysDate = new Date();

class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false, // add project modal is closed initially
      projectName: '',
      cluster_ID: '',
      clusters: [],
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getUserProjects, data } = this.props;
    getUserProjects(data.id);
    availableClusters()
      .then(res => {
        this.setState({
          clusters: res.data.clusters
        });
        console.log("hello", this.state.clusters);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const project = {
      projectName: this.state.projectName,
      alias: this.state.projectName + todaysDate.toISOString(),
      cluster_ID: this.state.cluster_ID,
      owner_ID: this.state.data.id
    };

    this.setState({
      loading: true
    });
  }
  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    this.setState({ openModal: false });
  }

  render() {
    const { projects, isRetrieving } = this.props;
    const {
      openModal,
      projectName,
      cluster_ID,
      loading
    } = this.state;

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBar2 header="Projects" showBtn btnAction={this.showForm} />
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
                  { projects.length !== 0 ? (
                    projects.map((project) => (
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
                      <div className="EmptyList">
                        <h3>No Projects Yet.</h3>
                      </div>
                    )}
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

        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal}>
          <div className="ModalForm">
            <div className="ModalFormHeading">
              <h2>Add a project</h2>
            </div>
            <div className="ModalFormInputs">
              <InputText
                placeholder="Project Name"
                name="projectName"
                value={projectName}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </div>
            <div className="ModalFormButtons">
              <PrimaryButton label="Create project" />
              <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideForm} />
            </div>
          </div>
        </Modal>
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

export const mapStateToProps = (state) => {
  const { isRetrieving, projects } = state.UserProjectsReducer;
  const { data } = state.user;
  return { isRetrieving, projects, data };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserProjects
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
