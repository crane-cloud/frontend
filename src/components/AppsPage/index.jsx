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
      openModal: false, // add project component is closed initially
      error: "",
      port: "",
    };

    this.state = this.initialState;

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.getProjectDetails = this.getProjectDetails.bind(this);

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

 
  getProjectDetails(projects,id) {
    const project = projects.find((project) => project.id === id);
    return project;
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
    const projectDetails = this.getProjectDetails(projects, params.projectID);

     const filteredDetails = {
       name: projectDetails.name,
       description: projectDetails.description,
       organisation: projectDetails.organisation,
       project_type: projectDetails.project_type,
     };

    localStorage.setItem("project", JSON.stringify(filteredDetails));

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={projectDetails.name}
              params={params}
              description={projectDetails.description}
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
