import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import BlackInputText from "../BlackInputText";
import getUsersList from "../../redux/actions/users";
import addUserCredits from "../../redux/actions/addCredits";
import "./UserAccounts.css";
import Header from "../Header";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import Modal from "../Modal";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import PrimaryButton from "../PrimaryButton";
import addBetaUser from "../../redux/actions/addBetaUser";
import Feedback from "../Feedback";

class UserAccounts extends Component {
  constructor() {
    super();
    this.state = {
      actionsMenu: false,
      betaUserModal: false,
      addCredits: false,
      credits: "",
      creditDescription: "",
      selectedUser: "",
      word: "",
      SearchList: [],
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
    this.handleCallbackSearchword = this.handleCallbackSearchword.bind(this);
    this.searchThroughAccounts = this.searchThroughAccounts.bind(this);
  }
  componentDidMount() {
    const { getUsersList } = this.props;
    getUsersList();
  }

  componentDidUpdate(prevProps) {
    const { getUsersList, isAdded, Added } = this.props;
    if (isAdded !== prevProps.isAdded) {
      getUsersList();
      this.closeBetaUserModal();
    }
    if (Added !== prevProps.Added) {
      getUsersList();
      this.hideCreditsModal();
    }
  }

  searchThroughAccounts() {
    const { users } = this.props;
    const { word } = this.state;
    let resultsList = [];
    users.forEach((element) => {
      if (element.name.toLowerCase().includes(word.toLowerCase())) {
        resultsList.push(element);
      }
    });
    this.setState({ searchList: resultsList });
  }

  handleCallbackSearchword({ target }) {
    const { value } = target;
    this.setState({ word: value });
    if (value !== "") {
      this.searchThroughAccounts();
    }
    if (value === "") {
      this.setState({ searchList: [] });
    }
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
    const { credits, creditDescription, selectedUser } = this.state;
    const { addUserCredits } = this.props;
    if (credits !== "" && creditDescription !== "") {
      const creditsObject = {
        amount: credits,
        description: creditDescription,
        user_id: selectedUser,
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
    const { isAdded } = this.props;
    if (isAdded) {
      return <Redirect to={`/accounts`} noThrow />;
    }
  };

  render() {
    const {
      users,
      isFetched,
      isFetching,
      isAdding,
      isFailed,
      error,
      isAdded,
      Adding,
      Failed,
    } = this.props;
    const clusterName = localStorage.getItem("clusterName");
    const {
      match: { params },
    } = this.props;
    const {
      actionsMenu,
      selectedUser,
      betaUserModal,
      credits,
      creditDescription,
      word,
      searchList,
    } = this.state;

    return (
      <div className="MainPage">
        {isAdded ? this.renderRedirect() : null}
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="User Accounts" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="SearchBar">
                <div className="AdminSearchInput">
                  <input
                    type="text"
                    className="searchTerm"
                    name="Searchword"
                    placeholder="Search for account"
                    value={word}
                    onChange={this.handleCallbackSearchword}
                  />
                  <SearchButton className="SearchIcon" />
                </div>
              </div>
              <div
                className={
                  isFetching
                    ? "ResourcesTable LoadingResourcesTable"
                    : "ResourcesTable"
                }
              >
                <table className="UsersTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Beta User</th>
                      <th>Credits</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {isFetching ? (
                    <tbody>
                      <tr className="TableLoading">
                        <td>
                          <div className="SpinnerWrapper">
                            <Spinner size="big" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : word !== "" ? (
                    <tbody>
                      {isFetched &&
                        searchList.map((user) => (
                          <tr key={users.indexOf(user)}>
                            <td>{user?.name}</td>
                            <td>{user.is_beta_user ? "True" : "False"}</td>
                            <td>
                              {user?.credits.length === 0 ? (
                                "No credits"
                              ) : (
                                <div className="creditSection">
                                  {user?.credits[0]?.amount}
                                  <div className="creditCoin">
                                    {" "}
                                    <Coin title="credits" />
                                  </div>
                                </div>
                              )}
                            </td>
                            <td>{user?.email}</td>
                            <td
                              onClick={(e) => {
                                this.showMenu(user.id);
                                this.handleClick(e);
                              }}
                            >
                              <MoreIcon />
                              {actionsMenu && user.id === selectedUser && (
                                <div className="BelowHeader bg-light">
                                  <div className="context-menu">
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                      onClick={this.showBetaUserModal}
                                    >
                                      Add Beta User
                                    </div>
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                      onClick={this.showBetaUserModal}
                                    >
                                      Assign Credits
                                    </div>
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                    >
                                      <Link
                                        to={{
                                          pathname: `/accounts/${selectedUser}`,
                                        }}
                                      >
                                        View User Profile
                                      </Link>
                                    </div>
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                    >
                                      <Link
                                        to={{
                                          pathname: `/accounts/${selectedUser}/logs`,
                                        }}
                                      >
                                        View User Logs
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) : (
                    <tbody>
                      {isFetched &&
                        users !== undefined &&
                        users?.map((user) => (
                          <tr key={users.indexOf(user)}>
                            <td>{user?.name}</td>
                            <td>{user.is_beta_user ? "True" : "False"}</td>
                            <td>
                              {user?.credits.length === 0 ? (
                                "No credits"
                              ) : (
                                <div className="creditSection">
                                  {user?.credits[0]?.amount}
                                  <div className="creditCoin">
                                    {" "}
                                    <Coin title="credits" />
                                  </div>
                                </div>
                              )}
                            </td>
                            <td>{user?.email}</td>
                            <td
                              onClick={(e) => {
                                this.showMenu(user.id);
                                this.handleClick(e);
                              }}
                            >
                              <MoreIcon />
                              {actionsMenu && user.id === selectedUser && (
                                <div className="BelowHeader bg-light">
                                  <div className="context-menu">
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                      onClick={this.showBetaUserModal}
                                    >
                                      Add Beta User
                                    </div>
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                      onClick={this.showBetaUserModal}
                                    >
                                      Assign Credits
                                    </div>
                                    <div
                                      className="DropDownLink"
                                      role="presentation"
                                    >
                                      <Link
                                        to={{
                                          pathname: `/accounts/${selectedUser}`,
                                        }}
                                      >
                                        View User Profile
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>
                {isFetched && users.length === 0 && (
                  <div className="AdminNoResourcesMessage">
                    <p>No Users Available</p>
                  </div>
                )}
                {!isFetching && !isFetched && (
                  <div className="AdminNoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve Available
                      Users.
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
                    label="Cancel"
                    onClick={() => this.hideCreditsModal()}
                  />

                  <PrimaryButton
                    type="button"
                    label={Adding ? <Spinner /> : "Add"}
                    onClick={() => this.handleCreditSubmittion()}
                  />
                </div>
                {Failed && (
                  <Feedback message={"failed to add credits"} type={"error"} />
                )}
              </div>
            </Modal>
            <Modal
              showModal={betaUserModal}
              onClickAway={this.closeBetaUserModal}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title BetaUserText"
                    id="exampleModalLongTitle"
                  >
                    Add user as Beta user?
                  </h5>
                </div>
                <div class="modal-footer BetaUser">
                  <PrimaryButton
                    type="button"
                    className="CancelBtn"
                    label="Cancel"
                    onClick={this.closeBetaUserModal}
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton
                    type="button"
                    label={isAdding ? <Spinner /> : "Confirm"}
                    onClick={this.handleBetaUserSubmit}
                  />
                </div>
                {isFailed && (
                  <Feedback
                    message={error !== "" ? error : null}
                    type={"error"}
                  />
                )}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

// inititate props
UserAccounts.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  isFetched: PropTypes.bool,
  getUsersList: PropTypes.func.isRequired,
};

// assigning defaults
UserAccounts.defaultProps = {
  users: [],
  isFetching: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isFetching, users, isFetched } = state.usersListReducer;
  const { isAdded, isAdding, isFailed, error } = state.addBetaUserReducer;
  const { Added, Adding, Failed } = state.addUserCreditsReducer;
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
  };
};

const mapDispatchToProps = {
  getUsersList,
  addBetaUser,
  addUserCredits,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccounts);
