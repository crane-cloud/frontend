import React, {useEffect} from "react";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import getPvcs from "../../redux/actions/pvcs";
import Status from "../Status";
import tellAge from "../../helpers/ageUtility";
import Spinner from "../Spinner";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import usePaginator from "../../hooks/usePaginator";
// import { useParams } from "react-router-dom";

const  PvcsListPage =()=> {
  const { isRetrieving, pvcs, isFetched, pagination } = useSelector(
    (state) => state.pvcsReducer
  );
  const dispatch = useDispatch();
  const clusterID = localStorage.getItem("clusterID");
  const clusterName = localStorage.getItem("clusterName");
  const [currentPage, handleChangePage] = usePaginator();
  
  useEffect(() => {
    dispatch(getPvcs(clusterID, currentPage));
  }, [currentPage,clusterID,dispatch]);

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    dispatch(getPvcs(clusterID, currentPage));
  };
    return (
      <>
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
              <InformationBar header="Volume Claims" showBtn={false} />
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
                      <th>Status</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  {isRetrieving ? (
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
                        pvcs !== undefined &&
                        pvcs.map((pvc) => (
                          <tr key={pvcs.indexOf(pvc)}>
                            <td>{pvc.metadata.name}</td>
                            <td>
                              <Status status={pvc.status.phase} />
                            </td>
                            <td>{tellAge(pvc.metadata.creationTimestamp)}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>

                {isFetched && pvcs?.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Volume Claims Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve Volume
                      Claims.
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
      </div>
      </>
    );
  
}

export default PvcsListPage;
