

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
import styles from  "./AppSettingsPage.module.css";
import BlackInputText from "../BlackInputText";

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteAlert: false,
      error: "",
      disableDelete: true,
      ConfirmAppname: "",
    };

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name } = this.props.location;
    const {  openDeleteAlert} = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === name && openDeleteAlert) {
      this.setState({
        disableDelete: false,
      });
    } else if (e.target.value !== name && openDeleteAlert) {
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

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      message,
      isFailed,
    } = this.props;
    const { openDeleteAlert,ConfirmAppname,disableDelete} = this.state;
    const { name } = this.props.location;
    const { projectID, userID, appID } = params;

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
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header="Settings" />
            </div>
            <div className={styles.ContentSection}>
              <div className={styles.DeleteButtonDiv}>
                <PrimaryButton
                  label="Delete App"
                  className={styles.DeleteBtn}
                  onClick={this.showDeleteAlert}
                />
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
                            This will permanently delete the Application.
                            Please confirm by typing <b className={styles.DeleteWarning}>{name}</b> below.
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
                            <DeleteWarning textAlignment="Left"/>
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
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, message } = state.deleteAppReducer;
  return {
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
