import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import deleteApp, { clearState } from "../../redux/actions/deleteApp";
import InformationBar from "../InformationBar";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import Modal from "../Modal";
import SideBar from "../SideBar";
import Feedback from "../Feedback";
import DeleteWarning from "../DeleteWarning";
import styles from "./AppSettingsPage.module.css";
import BlackInputText from "../BlackInputText";
import SettingsButton from "../SettingsButton";
// import CreateApp from "../createApp";
import UpdateApp from "../updateApp";

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteAlert: false,
      error: "",
      disableDelete: true,
      ConfirmAppname: "",
      updateModal: false,
    };

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
  }

  handleChange(e) {
    const { openDeleteAlert } = this.state;
    const {
      match: { params },
    } = this.props;
    const { appID } = params;

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (openDeleteAlert && e.target.value === this.getAppName(appID)) {
      this.setState({
        disableDelete: false,
      });
    } else if (openDeleteAlert && e.target.value !== this.getAppName(appID)) {
      this.setState({
        disableDelete: true,
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }
  }
  getAppName(id) {
    const { apps } = this.props;
    return apps.apps.find((app) => app.id === id).name;
  }

  handleDeleteApp(e, appId) {
    const { deleteApp } = this.props;
    e.preventDefault();
    deleteApp(appId);
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearState } = this.props;
    clearState();
    this.setState({ openDeleteAlert: false });
  }

  renderRedirect = () => {
    const { isDeleted } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (isDeleted) {
      return (
        <Redirect to={`/users/${userID}/projects/${projectID}/apps`} noThrow />
      );
    }
  };

  showUpdateModal() {
    this.setState({ updateModal: true });
  }

  hideUpdateModal() {
    this.setState({ updateModal: false });
  }

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      message,
      isFailed,
    } = this.props;
    const { openDeleteAlert, ConfirmAppname, disableDelete } = this.state;
    // project name from line 105 disappears on refreash, another source of the name was needed
    //const { name } = this.props.location;
    const { projectID, userID, appID } = params;
    const name = this.getAppName(appID);

    return (
      <div className={styles.Page}>
        {isDeleted ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={name}
              params={params}
              // description={description}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          {this.state.updateModal ? (
            <UpdateApp closeComponent={this.hideUpdateModal} params={params} />
          ) : (
            <div className={styles.MainContentSection}>
              <div className={styles.InformationBarSection}>
                <InformationBar header="Settings" />
              </div>
              <div className={styles.ContentSection}>
                <div className={styles.APPSections}>
                  <div className={styles.APPSectionTitle}>
                    Manage application
                  </div>
                  <div className={styles.APPInstructions}>
                    <div className={styles.APPButtonRow}>
                      <div className="flexa">
                        <div>
                          <strong>Update application</strong>
                        </div>
                        <div>Update the application particulars.</div>
                      </div>
                      <div className={styles.SectionButtons}>
                        <SettingsButton
                          label="Update app"
                          onClick={this.showUpdateModal}
                        />
                      </div>
                    </div>
                    <div className={styles.APPButtonRow}>
                      <div className="flexa">
                        <div>
                          <strong>Delete application</strong>
                        </div>
                        <div>
                          Take down your application, any application related
                          data will be lost.
                        </div>
                      </div>
                      <div className={styles.SectionButtons}>
                        <SettingsButton
                          label="Delete this application"
                          className="Change-Btn"
                          onClick={this.showDeleteAlert}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {openDeleteAlert && (
                  <div className={styles.AppDeleteModel}>
                    <Modal
                      showModal={openDeleteAlert}
                      onClickAway={this.hideDeleteAlert}
                    >
                      <div className={styles.DeleteAppModel}>
                        <div className={styles.DeleteModalUpperSection}>
                          <div className={styles.WarningContainer}>
                            <div className={styles.DeleteDescription}>
                              Are you sure you want to delete&nbsp;
                              <span>{name}</span>
                              &nbsp;?
                            </div>
                            <div className={styles.DeleteSubDescription}>
                              This will permanently delete the application.
                              Please confirm by typing{" "}
                              <b className={styles.DeleteWarning}>{name}</b>{" "}
                              below.
                            </div>
                            <div className={styles.InnerModalDescription}>
                              <BlackInputText
                                required
                                placeholder={name}
                                name="ConfirmAppname"
                                value={ConfirmAppname}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                              />
                              <DeleteWarning textAlignment="Left" />
                            </div>
                          </div>
                        </div>

                        <div className={styles.DeleteModalLowerSection}>
                          <div className={styles.DeleteAppModelButtons}>
                            <PrimaryButton
                              label="cancel"
                              className="CancelBtn"
                              onClick={this.hideDeleteAlert}
                            />
                            <PrimaryButton
                              label={isDeleting ? <Spinner /> : "Delete"}
                              className={
                                disableDelete
                                  ? styles.InactiveDelete
                                  : styles.DeleteBtn
                              }
                              disable={disableDelete}
                              onClick={(e) => this.handleDeleteApp(e, appID)}
                            />
                          </div>

                          {message && (
                            <Feedback
                              type={isFailed ? "error" : "success"}
                              message={message}
                            />
                          )}
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

AppSettingsPage.propTypes = {
  isDeleted: PropTypes.bool,
  isFailed: PropTypes.bool,
  deleteApp: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

AppSettingsPage.defaultProps = {
  isDeleted: false,
  isFailed: false,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, message } = state.deleteAppReducer;
  const { apps } = state.appsListReducer;
  return {
    apps,
    isDeleting,
    isDeleted,
    isFailed,
    message,
  };
};

const mapDispatchToProps = {
  deleteApp,
  clearState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
