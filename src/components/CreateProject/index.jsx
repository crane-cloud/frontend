import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import CancelButton from "../CancelButton";
import Header from "../Header";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import BlackInputText from "../BlackInputText";
import addProject, {
  clearAddProjectState,
} from "../../redux/actions/addProject";
import getClustersList from "../../redux/actions/clusters";
import styles from "./CreateProject.module.css";
import {
  retrieveProjectTypes
} from "../../helpers/projecttypes";


class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      clusterID: "",
      projectDescription: "",
      projectType: "",
      projectOrganisation: "",
      error: "",
      othersBool:false,
      otherType:"",
    };

    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateProjectName = this.validateProjectName.bind(this);
    this.handleDatacenterSelectChange =
      this.handleDatacenterSelectChange.bind(this);
  }

  componentDidMount() {
    const { clearAddProjectState,getClustersList } = this.props;
    getClustersList();
    clearAddProjectState();
  }

  componentDidUpdate(prevProps) {
    const {
      isAdded,
    } = this.props;

    if (isAdded !== prevProps.isAdded) {
      return <Redirect to={`/projects`} noThrow />;
    }
  }

  handleTypeSelectChange(selected) {
    const{
      othersBool,
    } = this.state
      if(selected.id===6){
        if(!othersBool){
          this.setState({ othersBool: true });
        }
      }else{
        this.setState({ projectType: selected.value });
        if(othersBool){
          this.setState({ othersBool: false });
        }
      }
  };
  handleDatacenterSelectChange(selected) {
    this.setState({ clusterID: selected.id });
  }
  validateProjectName(name) {
    if (/^[a-z]/i.test(name)) {
      if (name.match(/[^-a-zA-Z]/)) {
        return "false_convention";
      }
      return true;
    }
    return false;
  }
  handleChange(e) {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (error) {
      this.setState({
        error: "",
      });
    }
  }

  handleSubmit() {
    const {
      projectName,
      projectDescription,
      clusterID,
      projectType,
      otherType,
      othersBool,
      projectOrganisation,
    } = this.state;
    const { addProject, data } = this.props;
    const capitalizeFirstLetter = (input) => input.charAt(0).toUpperCase() + input.slice(1);
    const type = othersBool ? capitalizeFirstLetter(otherType) : capitalizeFirstLetter(projectType);

    if (
      !projectName ||
      !clusterID ||
      !projectDescription ||
      !type ||
      !projectOrganisation
    ) {
      this.setState({
        error: "all fields are required",
      });
    } else if (this.validateProjectName(projectName) === false) {
      this.setState({
        error: "name should start with a letter",
      });
    } else if (this.validateProjectName(projectName) === "false_convention") {
      this.setState({
        error: "name may only contain letters and a hypen -",
      });
    } else if (projectName.length > 30) {
      this.setState({
        error: "project name may not exceed 30 characters",
      });
    // for a meaning full project type
    } else if(type.length < 4 || this.validateProjectName(type) === false 
    || this.validateProjectName(type) === "false_convention"){
      this.setState({
        error: "project type must be atleast 4 characters, start with a letter and may only contain letters and a hypen -",
      });
    } else if(this.validateProjectName(projectOrganisation) === false 
    || this.validateProjectName(projectOrganisation) === "false_convention"){
      this.setState({
        error: "project organisation must start with a letter and may only contain letters and a hypen -",
      });
    } else {

      const newProject = {
        description: projectDescription,
        cluster_id: clusterID,
        name: projectName,
        owner_id: data.id,
        organisation: projectOrganisation,
        project_type: type,
      };
      addProject(newProject);
    }
  }

  render() {
    const {
      isAdded,
      isAdding,
      message,
      errorCode,
      clusters: {clusters},
    } = this.props;
    const { projectName, projectDescription, error, projectOrganisation,othersBool,otherType } =
      this.state;
    const types = retrieveProjectTypes();
    if (isAdded) {
      return <Redirect to={`/projects/`} noThrow />;
    }
    return (
      <div className={styles.MainContentSection}>
        <Header />
        <div className={styles.InformationBarSection}>
          <div className={styles.InformationBar}>
            <div className={styles.InformationBarWithButton}>
              <div className={styles.InfoHeader}>Create Project</div>
              <div className={styles.RoundAddButtonWrap}>
                <CancelButton onClick={this.props.closeComponent} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ContentSection}>
          <div className={styles.FormsSection}>
            <div className={styles.ProjectForm}>
              <div className={styles.LeftFormElements}>
                <div className={styles.Element}>
                  <div className={styles.ElementTitle}>Datacenter</div>
                  <Select
                    required
                    placeholder="Choose Datacenter location"
                    options={clusters}
                    onChange={this.handleDatacenterSelectChange}
                  />
                </div>
                <div className={styles.Element}>
                  <div className={styles.ElementTitle}>Name</div>
                  <BlackInputText
                    required
                    placeholder="Project name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.Element}>
                  <div className={styles.ElementTitle}>Organisation</div>
                  <BlackInputText
                    required
                    placeholder="eg.Individual ,Makerere Universty..."
                    name="projectOrganisation"
                    value={projectOrganisation}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.Element}>
                  <div className={styles.ElementTitle}>Type</div>
                  <Select
                    required
                    placeholder="Choose project type"
                    options={types}
                    onChange={this.handleTypeSelectChange}
                  />
                  {othersBool && (<BlackInputText
                   required
                   placeholder="Type of project"
                   name="otherType"
                   value={otherType}
                   onChange={(e) => {
                     this.handleChange(e);
                   }}
                  />)}
                </div>
                <div className={styles.Element}>
                  <div className={styles.ElementTitle}>Description</div>
                  <textarea
                     className={styles.TextArea}
                     type="text"
                     placeholder="Project description"
                     rows="4"
                     cols="50"
                     name="projectDescription"
                     value={projectDescription}
                     onChange={(e) => {
                      this.handleChange(e);
                   }}
                  />
                </div>
              </div>
             
            </div>
            <div className={styles.CreateButtons}>
              <div className={styles.InnerContent}>
                <PrimaryButton
                  label={isAdding ? <Spinner /> : "Create"}
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
          <div className={styles.CreateProjectError}>
            {error && <Feedback type="error" message={error} />}
            {message && (
              <Feedback
                message={
                  errorCode === 409
                    ? "Name already in use, please choose another"
                    : message
                }
                type={isAdded && errorCode !== 409 ? "success" : "error"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  clusters: PropTypes.object,
  getClustersList: PropTypes.func.isRequired,
  clearAddProjectState: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  isAdded: PropTypes.bool,
  errorCode: PropTypes.number,
  isAdding: PropTypes.bool,
  message: PropTypes.string,
};

CreateProject.defaultProps = {
  clusters: [],
  isAdded: false,
  isAdding: false,
  errorCode: null,
  message: "",
  params: {},
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isAdded, isAdding, message, errorCode } = state.addProjectReducer;
  const { clusters } = state.clustersReducer;
  return {
    isAdded,
    data,
    clusters,
    errorCode,
    isAdding,
    message,
  };
};

const mapDispatchToProps = {
  addProject,
  getClustersList,
  clearAddProjectState,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
