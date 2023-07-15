import React, { useEffect, useState, useCallback } from "react";
import Header from "../Header";
import InformationBar from "../InformationBar";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import SideNav from "../SideNav";
import Spinner from "../Spinner";
import CreateAdminDB from "./CreateAdminDB";
import adminGetDatabases from "../../redux/actions/getAdminDatabases";
import styles from "./AdminDB.module.css";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination"
import { useSelector, useDispatch } from "react-redux";

const AdminDBList = () => {
  const [openCreateComponent, setOpenCreateComponent] = useState(false)
  const dispatch = useDispatch();
  const [currentPage, handleChangePage] = usePaginator();
  const clusterName = localStorage.getItem("clusterName");
  const clusterID = localStorage.getItem("clusterID");
  const databaseResources = useCallback(
    () => dispatch(adminGetDatabases(currentPage)),
    [dispatch, currentPage]
  );
  useEffect(() => {
    databaseResources();
  }, [databaseResources]);

  const { databases, databasesFetched, isFetchingDatabases, pagination } = useSelector(
    (state) => state.adminDatabasesReducer
  );
  const { isCreated } = useSelector(
    (state) => state.adminCreateDBReducer
  );

  useEffect(() => { 
    callbackCreateComponent();
    dispatch(adminGetDatabases(currentPage))
  }, [currentPage,isCreated,dispatch]);
  
  const showCreateComponent = () => {
    setOpenCreateComponent(true)
  }

  const callbackCreateComponent = () => {
    setOpenCreateComponent(false)
  }

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    databaseResources()
  };


  const sortedDbs = databases.sort((a, b) =>
    b.date_created > a.date_created ? 1 : -1
  );
  return (
    <div className={styles.MainPage}>
      <div className="TopBarSection">
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        {openCreateComponent ? (
          <CreateAdminDB closeComponent={callbackCreateComponent} />
        ) : (
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar
                header="Databases"
                showBtn
                buttontext="+ new database"
                btnAction={showCreateComponent}
              />
            </div>
            <div className={styles.ContentSection}>
              {isFetchingDatabases ? (
                <div className={styles.NoResourcesMessageSection}>
                  <div className={styles.SpinnerWrapper}>
                    <Spinner size="big" />
                  </div>
                </div>
              ) : (
                databasesFetched &&
                databases.length > 0 && (
                  <div
                    className={`${styles.DatabaseTable} MetricsCardContainer`}
                  >
                    <div
                      className={`${styles.DatabaseTableRow} CardHeaderSection`}
                    >
                      <div className={styles.DatabaseTableHead}>
                        Type
                        </div>
                      <div className={styles.DatabaseTableHead}>Name</div>
                      <div className={styles.DatabaseTableHead}>Host</div>
                      <div className={styles.DatabaseTableHead}>Age</div>
                    </div>
                    {databasesFetched &&
                      sortedDbs !== undefined &&
                      sortedDbs.map((database, index) => (
                        <div className={styles.DatabaseBody} key={index}>
                          <div
                            key={database.id}
                            className={styles.DatabaseTableRow}
                          >
                            <div className={styles.DatabaseTableCell}>
                              {database.database_flavour_name}
                            </div>
                            <div className={styles.DatabaseTableCell}>
                              {database.name}
                            </div>
                            <div className={styles.DatabaseTableCell}>
                              {database.host}
                            </div>
                            <div className={styles.DatabaseTableCell}>
                              {database.age}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              )}

              {databasesFetched && databases.length === 0 && (
                <div className={styles.NoResourcesMessageSection}>
                  <div className={styles.NoResourcesMessage}>
                    You haven’t created any databases yet.
                  </div>
                  <br></br>
                  <div className={styles.NoResourcesMessage}>
                    Click the &nbsp;{" "}
                    <ButtonPlus
                      className={styles.ButtonPlusSmall}
                      onClick={showCreateComponent}
                    />{" "}
                    &nbsp; button to create one.
                  </div>
                </div>
              )}

              {!isFetchingDatabases && !databasesFetched && (
                <div className={styles.NoResourcesMessage}>
                  Oops! Something went wrong! Failed to retrieve Databases.
                </div>
              )}
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
        )}
      </div>
    </div>
  );

}

export default AdminDBList;
