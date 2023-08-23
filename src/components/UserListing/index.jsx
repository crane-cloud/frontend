import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Spinner from "../Spinner";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
 
const UserListing = (props) => {
  const { currentPage, gettingUsers, handlePageChange } = props;
  const [actionsMenu, setActionsMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
 
  const { isFetching, users, isFetched, pagination } = useSelector(
    (state) => state.usersListReducer
  );
 
  useEffect(() => {
    gettingUsers(currentPage);
  }, [gettingUsers, currentPage]);
 
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
 
  return (
    <div className="APage">
      <div className="AMainSection">
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
      </div>
    </div>
  );
};
 
export default UserListing;
 

