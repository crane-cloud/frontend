import React, { useEffect, useCallback, useState } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import BlackInputText from "../BlackInputText";
import getUsersList from "../../redux/actions/users";
import addUserCredits from "../../redux/actions/addCredits";
import "./UserAccounts.css";
import Header from "../Header";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import Modal from "../Modal";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import PrimaryButton from "../PrimaryButton";
import addBetaUser from "../../redux/actions/addBetaUser";
import Feedback from "../Feedback";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";

const UserAccounts = () => {
  const [currentPage, handleChangePage] = usePaginator();

  const [actionsMenu, setActionsMenu] = useState(false);
  const [betaUserModal, setBetaUserModal] = useState(false);
  const [addCredits, setAddCredits] = useState(false);
  const [credits, setCredits] = useState("");
  const [creditDescription, setCreditDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [word, setWord] = useState("");
  // const [searchList, setSearchList] = useState([]);

  const { isFetching, users, isFetched, pagination } = useSelector(
    (state) => state.usersListReducer
  );
  const { isAdded, isAdding, isFailed, error } = useSelector(
    (state) => state.addBetaUserReducer
  );
  const { Added, Adding, Failed } = useSelector(
    (state) => state.addUserCreditsReducer
  );
  const dispatch = useDispatch();
  const gettingUsers = useCallback(
    (page, keyword = "") => dispatch(getUsersList(page, keyword)),
    [dispatch]
  );

  useEffect(() => {
    gettingUsers(currentPage);
  }, [gettingUsers, currentPage]);

  useEffect(() => {
    gettingUsers(currentPage);
    closeBetaUserModal();
    hideCreditsModal();
  }, [gettingUsers, isAdded, Added, currentPage]);

  const searchThroughAccounts = (keyword) => {
    // use api
    handleChangePage(1);
    gettingUsers(1, keyword);
  };

  const handleCallbackSearchword = ({ target }) => {
    const { value } = target;
    setWord(value);
    if (value !== "") {
      searchThroughAccounts(value);
    }
    if (value === "") {
      // setSearchList([]);
      handleChangePage(1);
      gettingUsers(1);
    }
  };

  const handleClick = (e) => {
    if (actionsMenu) {
      // this.closeModal();
      return;
    }
    setActionsMenu(true);
    e.stopPropagation();
    document.addEventListener("click", hideModal);
  };

  const hideModal = () => {
    setActionsMenu(false);
    document.removeEventListener("click", hideModal);
  };

  const showMenu = (id) => {
    setSelectedUser(id);
  };

  const showBetaUserModal = () => {
    setBetaUserModal(true);
  };
  const handleCreditSubmittion = () => {
    // const { addUserCredits } = this.props;
    if (credits !== "" && creditDescription !== "") {
      const creditsObject = {
        amount: credits,
        description: creditDescription,
        user_id: selectedUser,
      };
      dispatch(addUserCredits(creditsObject));
    }
  };
  const showCreditsModal = () => {
    setAddCredits(true);
  };
  const hideCreditsModal = () => {
    setAddCredits(false);
    setCredits("");
    setActionsMenu(false);
    setCreditDescription("");
    setSelectedUser("");
  };
  const closeBetaUserModal = () => {
    setBetaUserModal(false);
  };
  const handleBetaUserSubmit = () => {
    const betaUser = {
      is_beta_user: true,
      user_id: selectedUser,
    };
    dispatch(addBetaUser(betaUser));
  };
  const renderRedirect = () => {
    // const { isAdded } = this.props;
    if (isAdded) {
      return <Redirect to={`/accounts`} noThrow />;
    }
  };

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    gettingUsers();
  };

  return (
    <div className="Page">
      {isAdded ? renderRedirect() : null}
      <div className="TopRow">
        <Header />
        <InformationBar
          header={
            <>
              <Link className="breadcrumb" to={`/accounts`}>
                Overview
              </Link>
              <span> / Users Listing</span>
            </>
          }
          showBtn={true}
          adminRoute={true}
          dashboard={false}
        />
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
              onChange={(e) => {
                handleCallbackSearchword(e);
              }}
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
                  <td className="TableTdSpinner">
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
                          showMenu(user.id);
                          handleClick(e);
                        }}
                      >
                        <MoreIcon />
                        {actionsMenu && user.id === selectedUser && (
                          <div className="BelowHeader bg-light">
                            <div className="context-menu">
                              <div
                                className="DropDownLink"
                                role="presentation"
                                onClick={() => {
                                  showBetaUserModal();
                                }}
                              >
                                Add Beta User
                              </div>
                              <div
                                className="DropDownLink"
                                role="presentation"
                                onClick={() => {
                                  showCreditsModal();
                                }}
                              >
                                Assign Credits
                              </div>
                              <div className="DropDownLink" role="presentation">
                                <Link
                                  to={{
                                    pathname: `/accounts/${selectedUser}`,
                                  }}
                                >
                                  View User Profile
                                </Link>
                              </div>
                              <div className="DropDownLink" role="presentation">
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
                Oops! Something went wrong! Failed to retrieve Available Users.
              </p>
            </div>
          )}
        </div>
        {pagination?.pages > 1 && (
          <div className="AdminPaginationSection">
            <Pagination
              total={pagination.pages}
              current={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <Modal showModal={addCredits} onClickAway={() => hideCreditsModal()}>
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
                setCredits(e.target.value);
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
              setCreditDescription(e.target.value);
            }}
          />
        </div>
        <div className="ModalFooter">
          <div className="ModalButtons">
            <PrimaryButton
              className="CancelBtn"
              onClick={() => hideCreditsModal()}
            >
              Cancel
            </PrimaryButton>

            <PrimaryButton
              type="button"
              onClick={() => handleCreditSubmittion()}
            >
              {Adding ? <Spinner /> : "Add"}
            </PrimaryButton>
          </div>
          {Failed && (
            <Feedback message={"failed to add credits"} type={"error"} />
          )}
        </div>
      </Modal>
      <Modal showModal={betaUserModal} onClickAway={closeBetaUserModal}>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title BetaUserText" id="exampleModalLongTitle">
              Add user as Beta user?
            </h5>
          </div>
          <div class="modal-footer BetaUser">
            <PrimaryButton
              type="button"
              className="CancelBtn"
              onClick={() => {
                closeBetaUserModal();
              }}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              type="button"
              onClick={() => {
                handleBetaUserSubmit();
              }}
            >
              {isAdding ? <Spinner /> : "Confirm"}
            </PrimaryButton>
          </div>
          {isFailed && (
            <Feedback message={error !== "" ? error : null} type={"error"} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserAccounts;
