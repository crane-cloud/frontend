import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../../components/Spinner";
import { dateInWords } from "../../helpers/dateConstants";
import { retrieveDefaultDateRanges } from "../../helpers/dateRanges.js";
import "./AdminInactiveUsers.css";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import adminGetInactiveUsers from "../../redux/actions/getInactiveUsers.js";
import { compareLastSeen } from "../../helpers/compareLastSeen";
import BlackInputText from "../BlackInputText";

const AdminInactiveUsers = () => {
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState("7");
  const [customDateRange, setCustomDateRange] = useState("");
  const [customDateRangePage, setCustomDateRangePage] = useState(1);
  const [currentPage, handleChangePage] = usePaginator();
  const defaultDateRanges = retrieveDefaultDateRanges();

  const inactiveUsersList = useCallback(
    () => dispatch(adminGetInactiveUsers(currentPage, selectedDateRange)),
    [dispatch, currentPage, selectedDateRange]
  );

  useEffect(() => {
    inactiveUsersList();
  }, [inactiveUsersList]);

  const {
    inactiveUsers,
    pagination,
    isFetchingInactiveUsers,
    inactiveUsersFetched,
  } = useSelector((state) => state.adminGetInactiveUsersReducer);

  useEffect(() => {
    dispatch(adminGetInactiveUsers(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    inactiveUsersList();
  };

  const handleDateRangeChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setSelectedDateRange(selectedValue);

    if (selectedValue !== "custom") {
      setCustomDateRange("");
      setCustomDateRangePage(1);
    }
  };

  const handleApplyCustomDateRange = () => {
    dispatch(adminGetInactiveUsers(currentPage, customDateRange));
  };

  const handleCustomDateRangePageChange = (currentPage) => {
    setCustomDateRangePage(currentPage);
    dispatch(adminGetInactiveUsers(currentPage, customDateRange));
  };

  // Sort the user list in descending order of "last_seen"
  const sortedUserList = inactiveUsers.slice().sort(compareLastSeen);

  return (
    <>
      {isFetchingInactiveUsers ? (
        <div className="SpinnerArea">
          <div className="SpinnerWrapper">
            <Spinner size="big" />
          </div>
        </div>
      ) : inactiveUsersFetched && inactiveUsers.length === 0 ? (
        <div className="NoResourcesMessage">No inactive users found.</div>
      ) : (
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
              {selectedDateRange === "custom" && (
                <div className="CustomDateRangeSection">
                  <BlackInputText
                    type="text"
                    value={customDateRange}
                    onChange={(e) => setCustomDateRange(e.target.value)}
                    placeholder="Enter custom date range"
                  />
                  <div className="DateRangeButton">
                    <PrimaryButton onClick={handleApplyCustomDateRange}>
                      Apply
                    </PrimaryButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ResourcesTable">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Joined</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {sortedUserList?.map((user) => (
                  <tr key={user?.id}>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{dateInWords(new Date(user?.date_created))}</td>
                    <td>{dateInWords(new Date(user?.last_seen))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination?.pages > 1 && selectedDateRange !== "custom" && (
            <div className="AdminPaginationSection">
              <Pagination
                total={pagination.pages}
                current={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          {pagination?.pages > 1 && selectedDateRange === "custom" && (
            <div className="AdminPaginationSection">
              <Pagination
                total={pagination.pages}
                current={customDateRangePage}
                onPageChange={handleCustomDateRangePageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminInactiveUsers;
