import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import styles from "./UserProfile.module.css";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import Modal from "../../components/Modal";
import InformationBar from "../../components/InformationBar";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BlackInputText from "../BlackInputText";
import Spinner from "../../components/Spinner";
import PrimaryButton from "../PrimaryButton";
import getUserDetail from "../../redux/actions/userDetails";
import BackButton from "../../assets/images/backButton.svg";
import {
  updateProfile,
  clearUpdateProfileState,
} from "../../redux/actions/updateProfile";
import "../../index.css";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { name } = props.user;
    this.initialState = {
      username: name,
      editMode: false,
      showSaveModel: false,
      passwordModel: false,
      passwordChangeLoading: false,
      passwordChangeError: "",
      passwordChangeSuccess: "",
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSaving = this.handleChangeSaving.bind(this);
    this.closeEditMode = this.closeEditMode.bind(this);
    this.openEditMode = this.openEditMode.bind(this);
    this.showSaveChangesModel = this.showSaveChangesModel.bind(this);
    this.hideSaveChangesModel = this.hideSaveChangesModel.bind(this);
    this.showPasswordWarningModel = this.showPasswordWarningModel.bind(this);
    this.hidePasswordWarningModel = this.hidePasswordWarningModel.bind(this);
    this.handlePasswordChanage = this.handlePasswordChanage.bind(this);
  }

  componentDidMount() {
    const { getUserDetail, data } = this.props;
    clearUpdateProfileState();
    getUserDetail(data.id);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  showSaveChangesModel = () => {
    this.setState({ showSaveModel: true });
  };
  hideSaveChangesModel = () => {
    this.setState({ showSaveModel: false });
  };
  showPasswordWarningModel = () => {
    this.setState({ passwordModel: true });
  };
  hidePasswordWarningModel = () => {
    this.setState({ passwordModel: false });
  };
  closeEditMode() {
    this.setState({ editMode: false });
  }
  openEditMode() {
    this.setState({ editMode: true });
  }
  componentDidUpdate(prevProps) {
    const { profileUpdated, user } = this.props;
    if (profileUpdated !== prevProps.profileUpdated) {
      //log user out
      localStorage.clear();
      window.location.href = "/";
    }
    if (user !== prevProps.user) {
      this.setState({ username: user.name });
    }
  }

  handleChangeSaving() {
    const { updateProfile, user } = this.props;
    const { username } = this.state;
    if (user.name !== username) {
      const update = {
        name: username,
      };
      updateProfile(user.id, update);
    }
  }
  handlePasswordChanage() {
    const { user } = this.props;
    const userResetEmail = { email: user.email };
    this.setState({
      passwordChangeLoading: true,
    });
    axios
      .post(`${API_BASE_URL}/users/forgot_password`, userResetEmail)
      .then((response) => {
        if (response.data.status === "success") {
          this.setState({
            loading: false,
            passwordChangeSuccess:
              "Please check your email. If you cant find the email, check the spam folder",
          });
          setTimeout(() => {
            this.hidePasswordWarningModel();
          }, 2000);
        }
      })
      .catch((err) => {
        this.setState({
          passwordChangeLoading: false,
          passwordChangeError: "Something went wrong",
        });
      });
  }
  render() {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const {
      username,
      editMode,
      showSaveModel,
      passwordModel,
      passwordChangeError,
      passwordChangeSuccess,
      passwordChangeLoading,
    } = this.state;
    const { user, isFetching, isFetched, profileUpdating } = this.props;

    return (
      <div className={styles.Page}>
        <div>
          <div className={styles.TopRow}>
            <Header />
            <InformationBar header="Profile" />
          </div>
          <div className={styles.MainColumn}>
            <Link to={`/projects`}>
              <img src={BackButton} alt="Back Button" />
            </Link>
            {isFetching ? (
              <div className={styles.NoResourcesMessage}>
                <div className={styles.SpinnerWrapper}>
                  <Spinner size="big" />
                </div>
              </div>
            ) : isFetched ? (
              <div className={`${styles.ProfileContainer}  SmallContainer`}>
                {isFetched && (
                  <div className={styles.UserContainer}>
                    <section className={styles.ContainerHeadSection}>
                      <div className={styles.ProfileCard}>
                        <div className={styles.AvatarDiv}>
                          <Avatar
                            name={user.name}
                            className={styles.UserAvatar}
                          />
                          <div className={styles.Identity}>
                            <div className={styles.IdentityName}>
                              {user.name}
                            </div>
                            <div className={styles.IdentityInfor}>
                              <div>
                                {user.name.split(" ").slice(-1).join(" ")}
                              </div>
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className={styles.BackgroundInfor}>
                          <div>
                            Joined crane cloud on{" "}
                            {new Date(user.date_created).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </div>
                          <div className={styles.CardInfor}>
                            <div>Created 3 projects</div>{" "}
                            <div>Shares 2 projects</div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className={styles.ContainerSection}>
                      <div className={styles.HeaderSection}>
                        <div className={styles.UserSectionTitle}>Information</div>
                        <div className={styles.UserSectionSubTitle}>
                          Your identity on crane cloud
                        </div>
                      </div>
                      <aside>
                        <div className={styles.ContainerCard}>
                          <div className={styles.EmailHead}>
                            <Avatar
                              name={user.name}
                              className={styles.UserAvatar}
                            />
                            {/* not editable */}
                            <div className={styles.InputDiv}>
                              <div className={styles.Title2}>Email</div>
                              <div>{user.email}</div>
                            </div>
                          </div>
                          <div className={styles.InputDiv}>
                            <div className={styles.Title2}>Name</div>
                            {editMode ? (
                              <BlackInputText
                                className={styles.CustomInput}
                                placeholder=""
                                name="username"
                                value={username}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                              />
                            ) : (
                              <div>{user.name}</div>
                            )}
                          </div>
                          {editMode && (
                            <div className={styles.PasswordChange}>
                              <div>Change Password</div>
                              <PrimaryButton
                                onClick={() => {
                                  this.showPasswordWarningModel();
                                }}
                                className={styles.BackButton}
                              >
                                Reset password by email
                              </PrimaryButton>
                            </div>
                          )}
                          {editMode ? (
                            <div className={styles.ButtonsDiv}>
                              <PrimaryButton
                                onClick={() => {
                                  user.name !== username &&
                                    this.showSaveChangesModel();
                                }}
                                className={styles.BackButton}
                              >
                                Save
                              </PrimaryButton>
                              <PrimaryButton
                                onClick={() => {
                                  this.closeEditMode();
                                }}
                                className={styles.PairButtonCancel}
                              >
                                Cancel
                              </PrimaryButton>
                            </div>
                          ) : (
                            <PrimaryButton
                              onClick={() => {
                                this.openEditMode();
                              }}
                              className={styles.BackButton}
                            >
                              Edit profile
                            </PrimaryButton>
                          )}
                        </div>
                      </aside>
                    </section>
                    <section className={styles.ContainerSection}>
                      <div className={styles.HeaderSection}>
                        <div className={styles.UserSectionTitle}>
                          More information
                        </div>
                        <div className={styles.UserSectionSubTitle}>
                          More information about a user
                        </div>
                      </div>
                      <aside>
                        <div className={styles.ContainerCard}>
                          <div className={styles.ExtraContentDiv}>
                            <div>
                              <div className={styles.UserSectionTitle}>Credits</div>
                              <div className={styles.UserSectionSubTitle}>
                                Assigned by Admin for billing purporses
                              </div>
                            </div>
                            <div className={styles.RowContent}>
                              {user.credits.length === 0 ? (
                                "0 credits"
                              ) : (
                                <div className={styles.CreditsContainer}>
                                  {" "}
                                  {user.credits[0].amount}
                                  <div className={styles.CoinSize}>
                                    <Coin />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={styles.ExtraContentDiv}>
                            <div className={styles.UserSectionTitle}>Beta User</div>
                            <div
                              className={
                                user.is_beta_user === true
                                  ? styles.rowContentYes
                                  : styles.rowContentNo
                              }
                            >
                              {user.is_beta_user === true ? "Yes" : "No"}
                            </div>
                          </div>
                        </div>
                      </aside>
                    </section>
                  </div>
                )}
              </div>
            ) : null}

            {!isFetching && !isFetched && (
              <div className={styles.NoResourcesMessage}>
                Oops! Something went wrong! Failed to retrieve user.
              </div>
            )}
          </div>
        </div>
        {showSaveModel === true && (
          <div className={styles.ProjectDeleteModel}>
            <Modal
              showModal={showSaveModel}
              onClickAway={() => {
                this.hideSaveChangesModel();
              }}
            >
              <div className={styles.ModelContent}>
                <div className={styles.ModelHeader}>Save Changes</div>
                <div className={styles.UpdateForm}>
                  <div className={styles.InformationText}>
                    Confirm you want to save new changes, this will log you out
                    automatically.
                  </div>
                  <div className={styles.UpdateProjectModelButtons}>
                    <PrimaryButton
                      className={styles.BackButton}
                      onClick={() => {
                        this.handleChangeSaving();
                      }}
                    >
                      {profileUpdating ? <Spinner /> : "Confirm"}
                    </PrimaryButton>
                    <PrimaryButton
                      className={styles.PairButtonCancel}
                      onClick={() => {
                        this.hideSaveChangesModel();
                      }}
                    >
                      Cancel
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
        {passwordModel === true && (
          <div className={styles.ProjectDeleteModel}>
            <Modal
              showModal={passwordModel}
              onClickAway={() => {
                this.hidePasswordWarningModel();
              }}
            >
              <div className={styles.ModelContent}>
                <div className={styles.ModelHeader}>Change Password</div>
                <div className={styles.UpdateForm}>
                  <div className={styles.InformationText}>
                    Confirm and an email to edit your password will be sent to
                    you. Redo the process in case you don't recieve the email
                  </div>
                  <div className={styles.UpdateProjectModelButtons}>
                    <PrimaryButton
                      className={styles.BackButton}
                      onClick={() => {
                        this.handlePasswordChanage();
                      }}
                    >
                      {passwordChangeLoading ? <Spinner /> : "Confirm"}
                    </PrimaryButton>
                    <PrimaryButton
                      className={styles.PairButtonCancel}
                      onClick={() => {
                        this.hidePasswordWarningModel();
                      }}
                    >
                      Cancel
                    </PrimaryButton>
                  </div>
                  <div>
                    {passwordChangeSuccess && (
                      <div className={styles.FeedBackDiv}>
                        {passwordChangeSuccess}
                      </div>
                    )}
                    {passwordChangeError && (
                      <div className={styles.ErrorDiv}>
                        {passwordChangeError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
        <div className={styles.FooterRow}>
          <div>
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  isFetched: PropTypes.bool,
  message: PropTypes.string,
  isFetching: PropTypes.bool,
  profileUpdated: PropTypes.bool,
  profileUpdating: PropTypes.bool,
  profileUpdateFailed: PropTypes.bool,
};

UserProfile.defaultProps = {
  user: {},
  message: "",
  isFetched: false,
  isFetching: false,
  profileUpdated: false,
  profileUpdating: false,
  profileUpdateFailed: false,
};

export const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isFetching, user, isFetched, message } = state.userDetailReducer;
  const { profileUpdateFailed, profileUpdated, profileUpdating, errorMessage } =
    state.updateProfileReducer;
  return {
    isFetching,
    user,
    isFetched,
    message,
    data,
    profileUpdateFailed,
    profileUpdated,
    errorMessage,
    profileUpdating,
  };
};

const mapDispatchToProps = {
  getUserDetail,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
