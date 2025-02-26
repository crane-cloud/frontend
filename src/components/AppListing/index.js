import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "../../components/Pagination";
import Spinner from "../Spinner";
import { useAppList } from "../../hooks/useApps";

const AppListing = (props) => {
  const {
    sectionValue,
    currentPage,
    currentPaginationPage,
    handleChangePage,
    setCurrentPaginationPage,
  } = props;

  const { data: response, isLoading } = useAppList(
    sectionValue,
    currentPaginationPage
  );

  const history = useHistory();

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    setCurrentPaginationPage(currentPage);
  };

  return (
    <div className="ContentSection">
      <div
        className={
          isLoading ? "ResourcesTable LoadingResourcesTable" : "ResourcesTable"
        }
      >
        <table className="UsersTable">
          <thead className="uppercase">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Url</th>
              <th>Age</th>
            </tr>
          </thead>
          {isLoading ? (
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
              {!isLoading &&
                response?.data?.data?.apps !== undefined &&
                response?.data?.data?.apps?.map((app) => (
                  <tr
                    key={response?.data?.data?.apps.indexOf(app)}
                    onClick={() => {
                      history.push(`/apps/${app?.id}`);
                    }}
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

        {response?.data?.data?.apps.length === 0 && (
          <div className="AdminNoResourcesMessage">
            <p>No apps Available</p>
          </div>
        )}
        {!isLoading && response?.data?.data?.apps?.length === 0 && (
          <div className="AdminNoResourcesMessage">
            <p>
              Oops! Something went wrong! Failed to retrieve Available apps.
            </p>
          </div>
        )}
      </div>
      {response?.data?.data?.pagination?.pages > 1 && (
        <div className="AdminPaginationSection">
          <Pagination
            total={response?.data?.data?.pagination?.pages}
            current={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AppListing;