import React, { useEffect } from "react";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import SideNav from "../../components/SideNav";
import Spinner from "../../components/Spinner";
import getPvs from "../../redux/actions/pvs";
import Status from "../../components/Status";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import usePaginator from "../../hooks/usePaginator";
import AppFooter from "../../components/appFooter";
// import { useParams } from "react-router-dom";

const PvsListPage = (props) => {
  const { isRetrieving, pvs, isFetched, pagination } = useSelector(
    (state) => state.pvsReducer
  );
  const dispatch = useDispatch();
  
  const clusterName = localStorage.getItem("clusterName");
  const [currentPage, handleChangePage] = usePaginator();
  const  clusterID  = localStorage.getItem("clusterID");
  useEffect(() => {
    dispatch(getPvs(clusterID, currentPage));
  }, [clusterID, currentPage,dispatch]);

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    dispatch(getPvs(clusterID, currentPage));
  };



  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header="Volumes" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div
              className={
                isRetrieving
                  ? "ResourcesTable LoadingResourcesTable"
                  : "ResourcesTable"
              }
            >
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Access Mode</th>
                    <th>Reclaim Policy</th>
                    <th>Status</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                {isRetrieving ? (
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
                      pvs !== undefined &&
                      pvs.map((pv) => (
                        <tr key={pvs.indexOf(pv)}>
                          <td>{pv.metadata.name}</td>
                          <td>{pv.spec.accessModes[0]}</td>
                          <td>{pv.spec.persistentVolumeReclaimPolicy}</td>
                          <td>
                            <Status status={pv.status.phase} />
                          </td>
                          <td>{pv.spec.capacity.storage}</td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>

              {isFetched && pvs.length === 0 && (
                <div className="NoResourcesMessage">
                  <p>No Volumes Available</p>
                </div>
              )}
              {!isRetrieving && !isFetched && (
                <div className="NoResourcesMessage">
                  <p>Oops! Something went wrong! Failed to retrieve Volumes.</p>
                </div>
              )}
            </div>
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
          <AppFooter/>
        </div>
      </div>
    </div>
  );
};
export default PvsListPage;
