import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
//import CancelButton from "../CancelButton";
import Header from "../Header";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import BlackInputText from "../BlackInputText";
//import Checkbox from "../Checkbox";
import ToggleOnOffButton from "../ToggleOnOffButton";
//import { ReactComponent as InfoIcon } from "../../assets/images/info-icon.svg";
import styles from "./CreateProject.module.css";
import { handlePostRequestWithOutDataObject } from "../../apis/apis.js";
import { retrieveProjectTypes } from "../../helpers/projecttypes";
import handleProjectValidation from "../../helpers/validation";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    const {
      clusters: { clusters },
    } = this.props;

    this.state = {
      projectName: "",
      clusterID: "",
      projectDescription: "",
      projectType: "",
      projectOrganisation: "",
      error: "",
      multiCluster: false,
      clusterchoices: false,
      othersBool: false,
      SelectedClusters: new Array(clusters?.length).fill(false),
      otherType: "",
      addingProject:false,
      addProjectError:"",
      addErrorCode:""
    };

    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDatacenterSelectChange =
      this.handleDatacenterSelectChange.bind(this);
    this.changeMultiSelectioOption = this.changeMultiSelectioOption.bind(this);
    this.togglemultiCluster = this.togglemultiCluster.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addNewProject  = this.addNewProject.bind(this);
  }

  // componentDidMount() {
    
  // }

  // componentDidUpdate(prevProps) {
   
  // }
  handleOnChange(position) {
    const { SelectedClusters } = this.state;
    this.setState({
      SelectedClusters: SelectedClusters.map((item, index) =>
        index === position ? !item : item
      ),
    });
  }
  changeMultiSelectioOption() {
    const { clusterchoices } = this.state;
    this.setState({
      clusterchoices: !clusterchoices,
    });
  }

  togglemultiCluster() {
    const { multiCluster } = this.state;
    this.setState({
      multiCluster: !multiCluster,
    });
  }

  handleTypeSelectChange(selected) {
    const { othersBool } = this.state;
    if (selected.id === 6) {
      if (!othersBool) {
        this.setState({ othersBool: true });
      }
    } else {
      this.setState({ projectType: selected.value });
      if (othersBool) {
        this.setState({ othersBool: false });
      }
    }
  }
  handleDatacenterSelectChange(selected) {
    this.setState({ clusterID: selected.id });
  }
  handleChange(e) {
    const { error, addProjectError } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (error) {
      this.setState({
        error: "",
      });
    }
    if(addProjectError){
      this.setState({
        addProjectError: "",
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
    const { data } = this.props;
    const capitalizeFirstLetter = (input) =>
      input.charAt(0).toUpperCase() + input.slice(1);
    const approvedType = othersBool
      ? capitalizeFirstLetter(otherType)
      : capitalizeFirstLetter(projectType);
    if (
      handleProjectValidation(
        projectName,
        projectDescription,
        approvedType,
        projectOrganisation,
        clusterID
      ) !== undefined
    ) {
      this.setState({
        error: handleProjectValidation(
          projectName,
          projectDescription,
          approvedType,
          projectOrganisation,
          clusterID
        ),
      });
    } else {
      const newProject = {
        description: projectDescription,
        cluster_id: clusterID,
        name: projectName,
        owner_id: data.id,
        organisation: projectOrganisation,
        project_type: approvedType,
      };
     // addProject(newProject);
     this.addNewProject(newProject)
    }
  }
  addNewProject(data) {
    this.setState({
      addingProject:true,
      addProjectError:""
    })
    handlePostRequestWithOutDataObject(
      data,
      `/projects`
    ).then(() => {
        window.location.href = `/projects`;
      })
      .catch((error) => {
        this.setState({
          addProjectError: "Failed to add project. Try again later",
          addingProject: false,
          addErrorCode:error.response?.status
        });
      });
  }

  render() {
    const {
      clusters: { clusters },
    } = this.props;
    const {
      projectName,
      projectDescription,
      error,
      projectOrganisation,
      othersBool,
      otherType,
      multiCluster,
      clusterchoices,
      SelectedClusters,
      addingProject,
      addProjectError,
      addErrorCode
    } = this.state;
    const types = retrieveProjectTypes();
   
    return (
      <div className={styles.MainContentSection}>
        <Header />
        <div className={styles.InformationBarSection}>
          <div className={styles.InformationBar}>
            <div className={styles.InformationBarWithButton}>
              <div className={styles.InfoHeader}>Create Project</div>
              <div className={styles.RoundAddButtonWrap}>
                {/*<CancelButton onClick={this.props.closeComponent} />*/}
                <PrimaryButton
                  btntype="close"
                  onClick={this.props.closeComponent}
                >
                  close
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ContentSection}>
          <div className={styles.FormsSection}>
            <div className="Card">
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
                    {/*  <div className={styles.ClusterCheckboxSection}>
                    <InfoIcon /> &nbsp; The above selection is for a single
                    cluster set up, for multi-cluster options check the box
                    below.
                  </div>
                  <div className={styles.ClusterCheckboxSection}>
                    <Checkbox
                      isBlack
                      onClick={this.togglemultiCluster}
                      isChecked={multiCluster}
                    />
                    <div className={styles.NormalText}>
                      &nbsp; Multi-cluster options
                    </div>
                  </div>*/}
                    {multiCluster && (
                      <div>
                        <div className={styles.ClusterToggleSection}>
                          <ToggleOnOffButton
                            onClick={this.changeMultiSelectioOption}
                          />{" "}
                          &nbsp; Cranecloud automatically selects the rest of
                          the clusters for this project.
                        </div>
                        {clusterchoices && (
                          <div>
                            <div className={styles.MultiSelectioOption}>
                              Please any other cluster for this project.
                            </div>
                            <div className={styles.Multipleclusters}>
                              {clusters.map(({ name, id }, index) => {
                                return (
                                  <li className={styles.ListStyle} key={index}>
                                    <div className={styles.clusterListItem}>
                                      <div className={styles.leftsection}>
                                        <input
                                          type="checkbox"
                                          id={id}
                                          name={name}
                                          value={name}
                                          checked={SelectedClusters[index]}
                                          onChange={() =>
                                            this.handleOnChange(index)
                                          }
                                        />
                                        <label
                                          className={styles.ClusterLabel}
                                          htmlFor={id}
                                        >
                                          {name}
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
                    {othersBool && (
                      <BlackInputText
                        required
                        placeholder="Type of project"
                        name="otherType"
                        value={otherType}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                    )}
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

                  {error && (
                    <div className={styles.CreateProjectError}>
                      <Feedback type="error" message={error} />
                    </div>
                  )}
                  {addProjectError && (
                    <div className={styles.CreateProjectError}>
                      <Feedback
                        message={
                          addErrorCode === 409
                            ? "Name already in use, please choose another"
                            : addProjectError
                        }
                        type={
                          addProjectError==="" && addErrorCode !== 409 ? "success" : "error"
                        }
                      />
                    </div>
                  )}
                  <div className={styles.InnerContent}>
                    <PrimaryButton
                      className="AuthBtn"
                      onClick={this.handleSubmit}
                      color="primary"
                    >
                      {addingProject ? <Spinner /> : "Create Project"}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  clusters: PropTypes.object,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

CreateProject.defaultProps = {
  clusters: [],
  params: {},
};

export const mapStateToProps = (state) => {
  const { data } = state.user;
  const { clusters } = state.clustersReducer;
  return {
    data,
    clusters,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
