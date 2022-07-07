import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";

import updateCluster, {
  clearUpdateClusterState,
} from "../../redux/actions/updateCluster";

import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import SideNav from "../../components/SideNav";
import Feedback from "../../components/Feedback";
import BlackInputText from "../../components/BlackInputText";
import styles from "./ClusterSettingsPage.module.css";


class ClusterSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        host:"",
        prometheus_url: "",
        token: "",
        description:"",
        error:"",
        currentCluster:{},
        openUpdateAlert: false,

    };

    this.showUpdateAlert = this.showUpdateAlert.bind(this);
    this.hideUpdateAlert = this.hideUpdateAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fliterCluster =  this.fliterCluster.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount(){
    const {
        match: { params },
        clearUpdateClusterState
      } = this.props;
      clearUpdateClusterState()
    const { clusterID } = params;
    this.fliterCluster(clusterID);
  }
  fliterCluster(clusterID){   
    const { clusters } = this.props;
    const { currentCluster } = this.state;
    for(var i = 0; i<clusters.clusters?.length ;i++){
        if(clusters.clusters[i].id === clusterID){
            this.setState({
               currentCluster: {currentCluster, ...clusters.clusters[i]},
               name: clusters.clusters[i].name,
               prometheus_url: clusters.clusters[i].prometheus_url !== null? clusters.clusters[i].prometheus_url:"",
               host: clusters.clusters[i].host
            })
        }
    }
  }
  handleChange(e) {
    const {
      errorMessage,
      clearUpdateClusterState,
    } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (errorMessage) {
      clearUpdateClusterState();
    }
  }


  handleSubmit() {
    const {
      host,
      prometheus_url,
      name,
      token,
      currentCluster
    } = this.state;
    const {
      match: {
        params: { clusterID },
      },
      updateCluster,
    } = this.props;
    let updateObject={}
   
    if(currentCluster.name !== name ){
        updateObject = {...updateObject, name}
    }
    if(currentCluster.prometheus_url !== prometheus_url  ){
        updateObject = {...updateObject, prometheus_url}
    }
    if(currentCluster.host !== host ){
        updateObject = {...updateObject, host:host}
    }
    if(token !== "" ){
        updateObject = {...updateObject, token}
    }
    if(Object.keys(updateObject).length >0 ){
        updateCluster(clusterID, updateObject);
    }else{
        this.setState({
            error:"Please edit any feild before update"
        });
    }
    }
  showUpdateAlert() {
    this.setState({ openUpdateAlert: true });
  }


  hideUpdateAlert() {
    this.setState({ openUpdateAlert: false });
  }

  

  
  renderRedirect = () => {
    const {  isUpdated, clearUpdateClusterState } = this.props;
    if ( isUpdated) {
        clearUpdateClusterState();
      return <Redirect to={`/clusters`} noThrow />;
    }
  };

  render() {
    const {
      match: { params },
      isUpdating,
      isFailed,
      isUpdated,
    } = this.props;
    const {
      openUpdateAlert,
      error,
      currentCluster,
      host,
      name,
      token,
      prometheus_url,
    } = this.state;
    const { clusterID } = params;

    return (
      <div className={styles.Page}>
       {isUpdated ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
          <SideNav clusterName={currentCluster.name} clusterId={clusterID} />
          </div>
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header="Settings" />
            </div>
            <div className={styles.ContentSection}>
              <div className={`${styles.ProjectSections} SmallContainer`}>
                <div className={styles.ProjectSectionTitle}>Manage Cluster</div>
                <div className={styles.ProjectInstructions}>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Update cluster
                      </div>
                      <div>Modify the cluster Information</div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <PrimaryButton
                        label="Update"
                        onClick={this.showUpdateAlert}
                      />
                    </div>
                  </div>
                
                </div>
              </div>

             
                <Modal showModal={openUpdateAlert} onClickAway={this.hideUpdateAlert}>
                <div className="ModalForm">
                    <div className="ModalFormHeading">
                    <h2>Update the cluster</h2>
                  </div>
                  <div className="ModalFormInputs">
            <div className="ModalFormInputsBasic">
                      <BlackInputText
                        placeholder="Host"
                        className = {styles.UpdateInputSection}
                        name="host"
                        value={host}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <BlackInputText
                        placeholder="Token"
                        name="token"
                        value={token}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <BlackInputText
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <BlackInputText
                        placeholder="Prometheus Url"
                        name="prometheus_url"
                        value={prometheus_url}
                        onChange={(e) => this.handleChange(e)}
                      />
        
                      {error && <Feedback type="error" message={error} />}
        
                      <div className={styles.UpdateProjectModelButtons}>
                        <PrimaryButton
                          label="cancel"
                          className="CancelBtn"
                          onClick={this.hideUpdateAlert}
                        />
                        <PrimaryButton
                          label={isUpdating ? <Spinner /> : "Update"}
                          onClick={this.handleSubmit}
                        />
                      </div>
        
                      {(isFailed || isUpdated) && (
                        <Feedback
                          type={isUpdated ? "success" : "error"}
                          message={isUpdated ? "Update successfull": "Update failed"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Modal>
            

             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClusterSettingsPage.propTypes = {
  isFailed: PropTypes.bool,
  clearUpdateClusterState: PropTypes.func.isRequired,
  updateCluster: PropTypes.func.isRequired,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  isUpdated: PropTypes.bool,
};

ClusterSettingsPage.defaultProps = {
  isUpdated: false,
  isUpdating: false,
  isFailed:false
};

export const mapStateToProps = (state) => {
  //wont re-fetch cluster because at this point they already exist in redux
  const { clusters } = state.clustersReducer;
  const { isUpdating , errorMessage, clearUpdateClusterState, isFailed, isUpdated } =
    state.updateClusterReducer;
  return {
    isUpdated,
    isUpdating,
    isFailed,
    errorMessage,
    clusters,
    clearUpdateClusterState,
  };
};

const mapDispatchToProps = {
  updateCluster,
  clearUpdateClusterState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterSettingsPage);
