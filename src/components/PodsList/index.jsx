import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import getPodsList from "../../redux/actions/pods";
import tellAge from "../../helpers/ageUtility";
import Header from "../Header";
import Status from "../Status";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import ProgressBar from "../ProgressBar";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import usePaginator from "../../hooks/usePaginator";
import { useParams } from "react-router-dom";

const PodsList =(props)=>{
  // constructor(props) {
  //   super(props);

  //   calculatePercentage = calculatePercentage.bind(this);
  //   displayFraction = displayFraction.bind(this);
  // }
  const { isRetrieving, pods, isFetched } = useSelector(
    (state) => state.podsReducer
  );

  const dispatch = useDispatch();
  const params = useParams();
  const clusterName = localStorage.getItem("clusterName");
  const [currentPage, handleChangePage] = usePaginator();
  const { clusterID } = params;
  useEffect(() => {
    dispatch(getPodsList(clusterID, currentPage));
  }, []);

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    dispatch(getPodsList(clusterID, currentPage));
  };
  // componentDidMount() {
  //   const { getPodsList } = props;
  //   const {
  //     match: { params },
  //   } = props;
  //   getPodsList(params.clusterID);
  // }

  const podStatus =(conditions)=> {
    let status = "";
    conditions.map((condition) => {
      if (condition.type === "Ready") {
        status = condition.status;
      }
      return null;
    });
    if (status === "True") {
      return true;
    }
    return false;
  }

  const calculatePercentage = (proportion, total) => {
    return Math.round((proportion / total) * 100);
  }

  const displayFraction = (numerator, denominator) => {
    return `${numerator}/${denominator}`;
  }

  const podReady = (containerlist) => {
    if (typeof containerlist !== "undefined") {
      const count = containerlist.length;
      let ready = 0;
      containerlist.map((container) => {
        if (container.ready) {
          ready += 1;
        }
        return 0;
      });
      return (
        <ProgressBar
          percentage={calculatePercentage(ready, count)}
          fractionLabel={displayFraction(ready, count)}
        />
      );
    }
    return (
      <ProgressBar
        percentage={calculatePercentage(0, 0)}
        fractionLabel={displayFraction(0, 0)}
      />
    );
  }

  // render() {
  //   const { pods, isFetched, isRetrieving } = props;
  //   const clusterName = localStorage.getItem("clusterName");
  //   const {
  //     match: { params },
  //   } = props;

    return (
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Pods" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? "ResourcesTable LoadingResourcesTable"
                    : "ResourcesTable"
                }
              >
                <table className="PodsTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ready</th>
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
                        pods.pods !== undefined &&
                        pods.pods.map((pod) => (
                          <tr key={pods.pods.indexOf(pod)}>
                            <td>{pod.metadata.name}</td>
                            <td>
                              {podReady(pod.status.containerStatuses)}
                            </td>
                            <td>
                              <Status
                                status={podStatus(pod.status.conditions)}
                              />
                            </td>
                            <td>{tellAge(pod.metadata.creationTimestamp)}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>
                {isFetched && pods.pods.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Pods Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>Oops! Something went wrong! Failed to retrieve Pods.</p>
                  </div>
                )}
              </div>
              {pods.pagination?.pages > 1 && (
            <div className="AdminPaginationSection">
              <Pagination
                total={pods.pagination.pages}
                current={currentPage}
                onPageChange={handlePageChange}
              />
            </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  
}

// inititate props
// PodsList.propTypes = {
//   pods: PropTypes.shape({
//     pods: PropTypes.arrayOf(PropTypes.object),
//   }),
//   isRetrieving: PropTypes.bool,
//   isFetched: PropTypes.bool,
//   getPodsList: PropTypes.func,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       clusterID: PropTypes.string,
//     }),
//   }),
// };

// // assigning defaults
// PodsList.defaultProps = {
//   pods: {},
//   isRetrieving: false,
//   isFetched: false,
// };

// export const mapStateToProps = (state) => {
//   const { isRetrieving, pods, isFetched } = state.podsReducer;
//   return { isRetrieving, pods, isFetched };
// };

// const mapDispatchToProps = {
//   getPodsList,
// };

export default PodsList;
