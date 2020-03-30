import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './UserProjectsPage.css';
import InformationBarSub from '../InformationBarSub';
import Header from '../Header';
import AddProject from '../../redux/actions/addProject';
import getClustersList from '../../redux/actions/ClustersActions';
import Modal from '../Modal';
import PrimaryButton from '../PrimaryButton';
import InputText from '../InputText';
import ProjectsList from '../ProjectsList';

// create uuid with ccuid prefix
const CCNSID = `ccuid${(new Date()).getTime().toString(16) + Math.floor(1E7 * Math.random()).toString(16)}`;

class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false, // add project modal is closed initially
      projectName: '',
      clusterID: '',
      clusters: [],
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getClustersList } = this.props;
    // getUserProjects(data.id);
    getClustersList();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    this.setState({ openModal: false });
  }

  handleSubmit() {
    const { projectName, clusterID } = this.state;
    const { AddProject, data, isAdded } = this.props;
    const newProject = {
      alias: projectName + CCNSID,
      cluster_id: '035f2057-c18d-4baf-9c26-17b38b5dff6c',
      name: projectName,
      owner_id: data.id
    };
    console.log(clusterID);
    AddProject(newProject);
    // this.setState({
    //   loading: true
    // });
    if (isAdded === true) {
      setTimeout(
        () => {
          this.setState({
            openModal: false
          });
        }, 1000
      );
    }
  }

  render() {
    const { clusters } = this.props;
    const {
      openModal,
      projectName,
      // clusterID,
      // loading
    } = this.state;
    const clustersList = clusters.clusters.length > 0
      && clusters.clusters.map((item, i) => (
        <option key={i} value={item.id}>{item.name}</option>
      ));

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBarSub header="Projects" showBtn btnAction={this.showForm} />
        </div>
        <div className="MainRow">
          <ProjectsList />
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
              <select
                name="cluster_ID"
                value={this.state.value}
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              >
                <option disabled selected>Pick a Cluster</option>
                {clustersList}
              </select>

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
              <PrimaryButton label="Create project" onClick={this.handleSubmit} />
              <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideForm} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

UserProjectsPage.propTypes = {
  clusters: PropTypes.object,
  project: PropTypes.object,
  isAdded: PropTypes.bool
};

UserProjectsPage.defaultProps = {
  clusters: {},
  project: {},
  isAdded: false
};

const mapStateToProps = (state) => {
  const { isAdded, project } = state.addProjectReducer;
  const { clusters } = state.ClustersReducer;
  const { data } = state.user;
  return { isAdded, project, data, clusters };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  AddProject, getClustersList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
