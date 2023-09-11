import React from "react";
import Pagination from "../../components/Pagination";
import Spinner from "../Spinner";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
 
const UserListing = (props) => {
  const {
    isFetching,
    users,
    isFetched,
    pagination,
    currentPage,
    handlePageChange,
  } = props;
  const history = useHistory();
 
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
                      <tr
                        key={users.indexOf(user)}
                        onClick={() => {
                          history.push(`/accounts/${user.id}`);
                        }}
                      >
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
 