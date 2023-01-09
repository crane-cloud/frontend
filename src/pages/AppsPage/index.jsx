import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";
import createApp, { clearState } from "../../redux/actions/createApp";
import AppsList from "../../components/AppsList";
import CreateApp from "../../components/CreateApp";
import "./AppsPage.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

class AppsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      openModal: false, // add project component is closed initially
      error: "",
      port: "",
      word: "",
    };

    this.state = this.initialState;

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.handleCallbackSearchword = this.handleCallbackSearchword.bind(this);
  }

  componentDidMount() {
    const { clearState } = this.props;
    clearState();
  }

  componentDidUpdate(prevProps) {
    const { isCreated } = this.props;

    if (isCreated !== prevProps.isCreated) {
      this.hideForm();
    }
  }
  handleCallbackSearchword(word) {
    this.setState({ word: word });
  }

  getProjectDetails(projects, id) {
    return projects?.find((project) => project.id === id);
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    const { clearState } = this.props;
    clearState();
    this.setState(this.initialState);
  }

  render() {
    const { openModal, word } = this.state;

    const {
      match: { params },
      isCreated,
      projects,
    } = this.props;

    const { projectID } = params;
    const projectDetails = this.getProjectDetails(projects, projectID);

    const filteredDetails = {
      name: projectDetails?.name,
      description: projectDetails?.description,
      organisation: projectDetails?.organisation,
      project_type: projectDetails?.project_type,
    };

    localStorage.setItem("project", JSON.stringify(filteredDetails));

    return (
      <div>
        {openModal ? (
          <DashboardLayout
            name={projectDetails?.name}
            header="Create App"
            showBtn
            buttontext="Close"
            btntype="close"
            btnAction={this.hideForm}
          >
            <CreateApp params={params} />
          </DashboardLayout>
        ) : (
          <DashboardLayout
            name={projectDetails?.name}
            header="Apps"
            showBtn
            buttontext="+ New App"
            showSearchBar
            placeholder="Search through apps"
            searchAction={this.handleCallbackSearchword}
            btnAction={this.showForm}
          >
            <AppsList
              params={params}
              newAppCreated={isCreated}
              word={word}
              openComponent={this.showForm}
            />
          </DashboardLayout>
        )}
      </div>
    );
  }
}

AppsPage.propTypes = {
  isCreated: PropTypes.bool,
  clearState: PropTypes.func,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = (state) => {
  const { isCreated } = state.createAppReducer;
  const { projects } = state.userProjectsReducer;
  return {
    isCreated,
    projects,
  };
};

const mapDispatchToProps = {
  createApp,
  clearState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppsPage));
