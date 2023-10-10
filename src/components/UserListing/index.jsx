import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import Spinner from "../Spinner";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { compareLastSeen } from "../../helpers/compareLastSeen";
import { dateInWords } from "../../helpers/dateConstants";
import Select from "../Select";
import { retrieveDefaultDateRanges } from "../../helpers/dateRanges";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import "./UserListing.css";

const UserListing = (props) => {
  let {
    sectionValue,
    isFetching,
    users,
    isFetched,
    pagination,
    currentPage,
    handlePageChange,
    setSelectedDateRange,
  } = props;
  const history = useHistory();
  const defaultDateRanges = retrieveDefaultDateRanges();
  const [selectedOption, setSelectedOption] = useState("");
  const [customDateRange, setCustomDateRange] = useState("");

  const handleDateRangeChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setSelectedDateRange(selectedValue);

    if (selectedValue !== "custom") {
      setSelectedOption("");
    }

    setSelectedOption(selectedValue);
  };

  const handleApplyCustomDateRange = (customDateRange) => {
    setSelectedDateRange(customDateRange);
  };

  // Sort the user list in descending order of "last_seen"
  const sortedUserList = users.slice().sort(compareLastSeen);

  return (
    <div className="SubTableContainer">
      <div className="AMainSection">
        <div className="ContentSection">
          {sectionValue === "active" && (
            <>
              <div className="TableHeader">
                <div className="DateRangeSection">
                  <Select
                    placeholder="Choose Date Range"
                    options={defaultDateRanges}
                    onChange={(selectedOption) =>
                      handleDateRangeChange(selectedOption)
                    }
                  />
                  {selectedOption === "custom" && (
                    <div className="CustomDateRangeSection">
                      <BlackInputText
                        type="text"
                        value={customDateRange}
                        onChange={(e) => setCustomDateRange(e.target.value)}
                        placeholder="Enter custom date range"
                      />
                      <div className="DateRangeButton">
                        <PrimaryButton
                          onClick={() =>
                            handleApplyCustomDateRange(customDateRange)
                          }
                        >
                          Apply
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <div
            className={
              isFetching
                ? "ResourcesTable LoadingResourcesTable"
                : "ResourcesTable"
            }
          >
            <table className="UsersTable">
              <thead className="uppercase">
                <tr>
                  {sectionValue === "active" ? (
                    <>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date Joined</th>
                      <th>Last Login</th>
                    </>
                  ) : (
                    <>
                      <th>Name</th>
                      <th>Beta User</th>
                      <th>Credits</th>
                      <th>Email</th>
                    </>
                  )}
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
                    sortedUserList?.map((user) => (
                      <tr
                        key={users.indexOf(user)}
                        onClick={() => {
                          history.push(`/accounts/${user.id}`);
                        }}
                      >
                        {sectionValue === "active" ? (
                          <>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{dateInWords(new Date(user?.date_created))}</td>
                            <td>{dateInWords(new Date(user?.last_seen))}</td>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
