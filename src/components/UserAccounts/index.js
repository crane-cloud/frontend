import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getUsersList from "../../redux/actions/users";
import "./UserAccounts.css";
import Header from "../Header";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import Modal from "../Modal";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import PrimaryButton from "../PrimaryButton";

class UserAccounts extends Component {
  constructor() {
    super();
    this.state = {
      actionsMenu: false,
      betaUserModal: false,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.showModal = this.showModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBetaUserSubmit = this.handleBetaUserSubmit.bind(this);
    this.closeBetaUserModal = this.closeBetaUserModal.bind(this);
    this.showBetaUserModal = this.showBetaUserModal.bind(this);
  }
  componentDidMount() {
    const { getUsersList } = this.props;
    getUsersList();
  }
  handleClick = (e) => {
    if (this.state.actionsMenu) {
      this.closeModal();
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

  closeBetaUserModal() {
    this.setState({
      betaUserModal: false,
    });
  }

  handleBetaUserSubmit(){
    console.log("Got it");
  }

  render() {
    const { users, isFetched, isFetching } = this.props;
    const clusterName = localStorage.getItem("clusterName");
    const {
      match: { params },
    } = this.props;
    const { actionsMenu, selectedUser, betaUserModal } = this.state;

    return (
      <div className="MainPage">
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
                  ) : (
                    <tbody>
                      {isFetched &&
                        users !== undefined &&
                        users?.map((user) => (
                          <tr key={users.indexOf(user)}>
                            <td>{user?.name}</td>
                            <td>{user.is_beta_user ? "True" : "False"}</td>
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
                                    {/* <div
                                      className="DropDownLink"
                                      role="presentation"
                                      onClick={this.showDeletionModal}
                                    >
                                      Delete
                                    </div> */}
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
                  <div className="NoResourcesMessage">
                    <p>No Users Available</p>
                  </div>
                )}
                {!isFetching && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve Available
                      Users.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Modal
              showModal={betaUserModal}
              onClickAway={this.closeBetaUserModal}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Add user as Beta user?
                  </h5>
                </div>
                <div class="modal-footer">
                  <PrimaryButton
                    type="button"
                    class="btn btn-info"
                    label="Cancel"
                    onClick={this.closeBetaUserModal}
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton
                    type="button"
                    className="btn btn-danger"
                    label={1 > 2 ? <Spinner /> : "Confirm"}
                    onClick={this.handleBetaUserSubmit}
                  />
                </div>
                {/* {addingCountryErr && (
                  <Feedback
                    message={addingCountryErr !== "" ? addingCountryMsg : null}
                    type={countryIsDeleted ? "success" : "error"}
                  />
                )} */}
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

const mapStateToProps = (state) => {
  const { isFetching, users, isFetched } = state.usersListReducer;
  return { isFetching, users, isFetched };
};

const mapDispatchToProps = {
  getUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccounts);
