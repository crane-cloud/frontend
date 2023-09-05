import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import Spinner from "../Spinner";

const AppListing = (props) => {
  const { currentPage, gettingApps, handlePageChange } = props; 

  const {  isFetching, apps, isFetched, pagination } = useSelector(
    (state) => state.appsAdminListReducer
  );

  useEffect(() => {
    gettingApps(currentPage);
  }, [gettingApps, currentPage]);
  
  return (
    <div className="SubTableContainer">
      <div className="AMainSection">
        <div className="ContentSection">
          <div
            className={
              isFetching
                ? "ResourcesTable LoadingResourcesTable"
                : "ResourcesTable"
            }
          ><table className="UsersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Url</th>
              <th>Age</th>
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
                apps !== undefined &&
                apps?.map((app) => (
                  <tr
                    key={apps.indexOf(app)}
                    // onClick={() => {
                    //   history.push(`/accounts/${user.id}`);
                    // }}
                  >
                    <td>{app?.name}</td>
                    <td>{app.image}</td>
                    <td>{app?.url}</td>
                    <td>{app?.age}</td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>

        {isFetched && apps.length === 0 && (
              <div className="AdminNoResourcesMessage">
                <p>No apps Available</p>
              </div>
            )}
            {!isFetching && !isFetched && (
              <div className="AdminNoResourcesMessage">
                <p>
                  Oops! Something went wrong! Failed to retrieve Available
                  apps.
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

export default AppListing;