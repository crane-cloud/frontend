import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import addUserCredits, {
  clearCreditsState,
} from "../../redux/actions/addCredits";
import "./AdminUserPage.css";
import Header from "../Header";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import Modal from "../Modal";
import DeleteWarning from "../../components/DeleteWarning";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import SettingsButton from "../SettingsButton";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import addBetaUser from "../../redux/actions/addBetaUser";
import adminGetUserCredits, {
  clearUserCredits,
} from "../../redux/actions/adminGetUserCredits";
import Feedback from "../Feedback";
import {
  getUser,
  nameStringToHslColor,
  avatarName,
} from "../../helpers/projectName";
import { DisplayDateTime } from "../../helpers/dateConstants";

class AdminUserPage extends Component {
  constructor() {
    super();
    this.state = {
      actionsMenu: false,
      betaUserModal: false,
      addCredits: false,
      credits: "",
      creditDescription: "",
      selectedUser: "",
      openDeleteAlert : false,
      openDisableAlert : false,
      error : "",
      hidden : true,

    };
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBetaUserSubmit = this.handleBetaUserSubmit.bind(this);
    this.closeBetaUserModal = this.closeBetaUserModal.bind(this);
    this.showBetaUserModal = this.showBetaUserModal.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.hideCreditsModal = this.hideCreditsModal.bind(this);
    this.showCreditsModal = this.showCreditsModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreditSubmittion = this.handleCreditSubmittion.bind(this);
    this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleDisableAlert = this.handleDisableAlert.bind(this);
    this.showDisableAlert = this.showDisableAlert.bind(this);
    this.hideDisableAlert = this.hideDisableAlert.bind(this);
  }
  componentDidMount() {
    const {
      adminGetUserCredits,
      clearUserCredits,
      clearCreditsState,
      match: { params },
    } = this.props;
    clearCreditsState();
    clearUserCredits();
    adminGetUserCredits(params.userID);
  }

  componentDidUpdate(prevProps) {
    const { Added , isDeleteUser , isDisableUser } = this.props;

    if (Added !== prevProps.Added) {
      this.hideCreditsModal();
    }
    if ( isDeleteUser !== prevProps.DeleteUser){
      this.hideDeleteAlert();
    }
    if (isDisableUser !== prevProps.DisableUser){
      this.hideDeleteAlert();
    }
  }

  handleDeleteAlert ( e , userID){
    const { deleteUser } = this.props;
    e.preventDefault();
    deleteUser(userID);
  }
  showDeleteAlert(){
    this.setState({openDeleteAlert : true});
  }
  hideDeleteAlert(){
    this.setState({openDeleteAlert : false});
  }
  handleDisableAlert ( e , userID){
    const { disableUser } = this.props;
    e.preventDefault();
    disableUser(userID);
  }
  showDisableAlert(){
    this.setState({openDisableAlert : true});
  }
  hideDisableAlert(){
    this.setState({openDisableAlert : false});
  }
  handleClick = (e) => {
    if (this.state.actionsMenu) {
      // this.closeModal();
      return;
    }
    this.setState({ actionsMenu: true });
    e.stopPropagation();
    document.addEventListener("click", this.hideModal);
  };

  hideModal = () => {
    this.setState({ actionsMenu: false });
    document.removeEventListener("click", this.hideModal);
  };

  showMenu(id) {
    this.setState({
      selectedUser: id,
    });
  }

  showBetaUserModal() {
    this.setState({
      betaUserModal: true,
    });
  }
  handleCreditSubmittion() {
    const { credits, creditDescription } = this.state;
    const {
      addUserCredits,
      match: { params },
    } = this.props;
    if (credits !== "" && creditDescription !== "") {
      const creditsObject = {
        amount: credits,
        description: creditDescription,
        user_id: params.userID,
      };
      addUserCredits(creditsObject);
    }
  }
  showCreditsModal() {
    this.setState({
      addCredits: true,
    });
  }
  hideCreditsModal = () => {
    const { clearCreditsState } = this.props;
    clearCreditsState();
    this.setState({
      addCredits: false,
      actionsMenu: false,
      credits: "",
      creditDescription: "",
      selectedUser: "",
    });
  };
  closeBetaUserModal() {
    this.setState({
      betaUserModal: false,
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleBetaUserSubmit() {
    const { selectedUser } = this.state;
    const { addBetaUser } = this.props;
    const betaUser = {
      is_beta_user: true,
      user_id: selectedUser,
    };
    addBetaUser(betaUser);
  }

  renderRedirect = () => {
    const { Added ,  isDeleteUser , isDisableUser } = this.props;

    if (Added) {
      return <Redirect to={`/accounts`} noThrow />;
    }
    if (isDeleteUser === "User Deleted Successfully"){
      this.hideDeleteAlert();
      return <Redirect to= {`/accounts/&{user_id}`} noThrow />;
    }
    if (isDisableUser === "User Disabled Successfully"){
      this.hideDisableAlert();
      return <Redirect to= {`/accounts/&{user_id}`} noThrow />;
  }
};

  render() {
    const { users, 
            isFetched, 
            isFetching, 
            Adding, 
            Failed, 
            userCredits, 
            Added , 
            isDeleteUser, 
            isDisableUser, 
            deletingUser, 
            isDisablingUser, 
            userDeleteFailed,
            userDisableFailed,
          } =this.props;
      
    const clusterName = localStorage.getItem("clusterName");
    const { userID } = this.props.match.params;
    const {
      match: { params },
    } = this.props;
    const { credits, 
            creditDescription, 
            openDeleteAlert,
            openDisableAlert,
          } = this.state;
    const user = getUser(users, params.userID);
    const { credit_assignment_records } = userCredits;
    return (
      <div className="MainPage">
        {Added ? this.renderRedirect() : null}
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header={`Accounts/${user?.name}`}
                showBtn={false}
              />
            </div>
            <div className="ContentSection">
              <div className="AdminUserPageContainer">
                <div className="UserProfile">
                  <div className="UserProfileIcon">
                    <div
                      className="UserAvatar"
                      style={{
                        backgroundColor: nameStringToHslColor(user?.name),
                        color: "#555",
                      }}
                    >
                      {avatarName(user?.name)}
                    </div>
                  </div>
                  <div className="UserProfileInfo">
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">Name:</div>
                      <div className="ProfileInfoValue">{user?.name}</div>
                    </div>
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">Email:</div>
                      <div className="ProfileInfoValue">{user?.email}</div>
                    </div>
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">User Role:</div>
                      <div className="ProfileInfoValue">
                        {user?.roles?.length > 0 ? user?.roles[0].name : "None"}
                      </div>
                    </div>
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">Beta User:</div>
                      <div className="ProfileInfoValue">
                        {user?.is_beta_user ? "True" : "False"}
                      </div>
                    </div>
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">Verified:</div>
                      <div className="ProfileInfoValue">
                        {user?.verified ? "True" : "False"}
                      </div>
                    </div>
                    <div className="ProfileInfoRow">
                      <div className="ProfileInfoAttribute">Credits:</div>
                      <div className=" CreditsButton">
                        <div className="CreditsWrap">
                          {user?.credits.length > 0
                            ? user?.credits[0].amount
                            : 0}
                          <Coin />
                        </div>
                        <>
                          <SettingsButton
                            label="Add Credits"
                            className="BlueButton"
                            onClick={this.showCreditsModal}
                          />
                        </>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="CreditsAlotted">
                  <div className="CreditsTable">
                    <div className="CreditsHeader">
                      Credits Assignment History
                    </div>
                    <div className="Credits">
                      <div className="CreditsHead">
                        <div className="CreditsHeaderRow">
                          <div className="CreditsHeaderAttribute">
                            Record ID
                          </div>
                          <div className="CreditsHeaderAttribute">
                            Date & Time
                          </div>
                          <div className="CreditsHeaderAttribute">Amount</div>
                          <div className="CreditsHeaderAttribute">
                            Description
                          </div>
                        </div>
                      </div>
                      <div className="CreditsBody">
                        {credit_assignment_records ? (
                          credit_assignment_records.map((credit) => (
                            <div className="CreditsHeaderRow">
                              <div className="CreditsRowAttribute">
                                {credit.id}
                              </div>
                              <div className="CreditsRowAttribute">
                                {DisplayDateTime(new Date(credit.date_created))}
                              </div>
                              <div className="CreditsRowAttribute">
                                {credit.amount}
                              </div>
                              <div className="CreditsRowAttribute">
                                {credit.description}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="CreditsError">
                            <>No Credits Assigned.</>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="DBSections">
                <div className="SectionTitle">Manage User</div>
                 <div className="ProjectInstructions">
                    <div className="MemberBody">
                     <div className="MemberTableRow">
                      <div className="SettingsSectionInfo">
                        <div className="SubTitle">Disable User<br/>
                          <div className="SubTitleContent">This will temporary disable the user.</div>
                        </div>
                        <div className="SectionButtons"> 
                          <PrimaryButton 
                            color="red-outline"
                            onClick={this.showDisableAlert}
                            >Disable
                            </PrimaryButton>
                      </div>
                    </div>
                    </div>
                    <div className="SettingsSectionInfo1">
                    <div className="SubTitle">Delete User<br />
                        <div className="SubTitleContent">This will permanently delete the user-history , apps , database and settings.</div>
                        </div>
                        <div className="SectionButtons">
                        <PrimaryButton
                            color="red-outline"
                            onClick={this.showDeleteAlert}
                            >Delete
                            </PrimaryButton>
                        </div>
                  </div>
              </div>
              </div>
                  {openDeleteAlert && (
                <div className="ProjectDeleteModel">
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={this.hideDeleteAlert}
                  >
                    <div className="DeleteDatabaseModel">
                      <div className="DeleteProjectModalUpperSection">
                        <div className="InnerModalDescription">
                          Are you sure you want to delete this user &nbsp;
                          <span className="DatabaseName">
                            {user.name} ?
                          </span>
                          <DeleteWarning />
                        </div>
                      </div>

                      <div className="DeleteProjectModalLowerSection">
                        <div className="DeleteProjectModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={this.hideDeleteAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            color="red"
                            onClick={(e) =>
                              this.handleDeleteAlert(
                                e,
                                userID,
                              )
                            }
                          >
                            {deletingUser ? <Spinner /> : "Delete"}
                          </PrimaryButton>
                        </div>

                        {userDeleteFailed && isDeleteUser && (
                          <Feedback message={isDeleteUser} type="error" />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              {openDisableAlert && (
                <div className="ProjectDeleteModel">
                  <Modal
                    showModal={openDisableAlert}
                    onClickAway={this.hideDisableAlert}
                  >
                    <div className="DeleteDatabaseModel">
                      <div className="DeleteProjectModalUpperSection">
                        <div className="InnerModalDescription">
                          Are you sure you want to disable this user &nbsp;
                          <span className="DatabaseName">
                            {user.name} ?
                          </span>
                          <DeleteWarning />
                        </div>
                      </div>

                      <div className="DeleteProjectModalLowerSection">
                        <div className="DeleteProjectModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={this.hideDisableAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            color="red"
                            onClick={(e) =>
                              this.handleDisableAlert(
                                e,
                                userID,
                              )
                            }
                          >
                            {isDisablingUser ? <Spinner /> : "Disable"}
                          </PrimaryButton>
                        </div>

                        {userDisableFailed && isDisableUser && (
                          <Feedback message={isDisableUser} type="error" />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}

                {!isFetching && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve User
                      Profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Modal
              showModal={this.state.addCredits}
              onClickAway={() => this.hideCreditsModal()}
            >
              <div className="ModalHeader">
                <h5 className="ModalTitle">Add Credits</h5>

                <div className="">Number of credits</div>
                <div className="ModalContent">
                  <BlackInputText
                    required
                    placeholder="Number of credits"
                    name="credits"
                    type="number"
                    value={credits}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                <div className="CreditsTitle">Description</div>
                <textarea
                  className="TextArea"
                  type="text"
                  placeholder="Credits description"
                  rows="4"
                  cols="50"
                  name="creditDescription"
                  value={creditDescription}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              <div className="ModalFooter">
                <div className="ModalButtons">
                  <PrimaryButton
                    className="CancelBtn"
                    onClick={() => this.hideCreditsModal()}
                  >
                    Cancel
                  </PrimaryButton>

                  <PrimaryButton
                    type="button"
                    onClick={() => this.handleCreditSubmittion()}
                  >
                    {Adding ? <Spinner /> : "Add"}
                  </PrimaryButton>
                </div>
                {Failed && (
                  <Feedback message={"failed to add credits"} type={"error"} />
                )}
              </div>
            </Modal>
            </div>
          </div>
      </div>
    </div>
    );
  }
}

// inititate props
AdminUserPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  isFetched: PropTypes.bool,
};

// assigning defaults
AdminUserPage.defaultProps = {
  users: [],
  isFetching: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isFetching, users, isFetched } = state.usersListReducer;
  const { isAdded, isAdding, isFailed, error } = state.addBetaUserReducer;
  const { Added, Adding, Failed } = state.addUserCreditsReducer;
  const { userCredits, creditsFetched, isFetchingCredits, clearUserCredits } =
    state.adminGetUserCreditsReducer;
  return {
    isFetching,
    users,
    isFetched,
    isAdded,
    isAdding,
    isFailed,
    error,
    Added,
    Adding,
    Failed,
    userCredits,
    creditsFetched,
    isFetchingCredits,
    clearUserCredits,
  };
};

const mapDispatchToProps = {
  addBetaUser,
  addUserCredits,
  adminGetUserCredits,
  clearUserCredits,
  clearCreditsState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);