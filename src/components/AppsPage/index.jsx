import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";
import createApp, { clearState } from "../../redux/actions/createApp";
import InformationBar from "../InformationBar";
import AppsList from "../AppsList";
import Header from "../Header";
import SideBar from "../SideBar";
import CreateApp from "../createApp";
import "./AppsPage.css";

class AppsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      openModal: false, // add project modal is closed initially
      error: "",
      port: "",
    };

    this.state = this.initialState;

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
    this.getProjectDescription = this.getProjectDescription.bind(this);
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

  getProjectName(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.name;
  }

  getProjectDescription(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.description;
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
    const { openModal } = this.state;

    const {
      match: { params },
      isCreated,
      projects,
    } = this.props;

    const { projectID, userID } = params;

    const projectDetails = {
      name: this.getProjectName(projects, params.projectID),
      description: this.getProjectDescription(projects, params.projectID),
    };

    localStorage.setItem("project", JSON.stringify(projectDetails));

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projects, params.projectID)}
              params={params}
              description={this.getProjectName(projects, params.projectID)}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          {openModal ? (
            <CreateApp closeComponent={this.hideForm} params={params} />
          ) : (
            <div className="MainContentSection">
              <div className="InformationBarSection">
                <InformationBar
                  header="Apps"
                  showBtn
                  btnAction={this.showForm}
                />
              </div>
              <div className="ContentSection">
                <AppsList params={params} newAppCreated={isCreated} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

AppsPage.propTypes = {
  isCreated: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
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
