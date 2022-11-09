import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./JobsListPage.css";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import SideNav from "../../components/SideNav";
import getJobs from "../../redux/actions/jobs";
import Status from "../../components/Status";
import Spinner from "../../components/Spinner";
import tellAge from "../../helpers/ageUtility";

const JobsListPage = () => {
  const { clusterID } = useParams();
  const dispatch = useDispatch();

  const adminJobs = useCallback(
    () => dispatch(getJobs(clusterID)),
    [dispatch, clusterID]
  );
  const { isRetrieving, jobs, isFetched } = useSelector(
    (state) => state.jobsReducer
  );

  useEffect(() => {
    adminJobs();
  }, [adminJobs]);

  const clusterName = localStorage.getItem("clusterName");
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
            <InformationBar header="Jobs" showBtn={false} />
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
                    <th>Duration</th>
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
                      jobs !== undefined &&
                      jobs.map((job) => (
                        <tr key={jobs.indexOf(job)}>
                          <td>{job.metadata.name}</td>
                          <td>{`${Math.floor(
                            (Date.parse(job.status.completionTime) -
                              Date.parse(job.status.startTime)) /
                              1000
                          )} seconds`}</td>
                          <td>
                            <Status status={job.status.succeeded} />
                          </td>
                          <td>{tellAge(job.metadata.creationTimestamp)}</td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {isFetched && jobs.length === 0 && (
                <div className="NoResourcesMessage">
                  <p>No Jobs Available</p>
                </div>
              )}
              {!isRetrieving && !isFetched && (
                <div className="NoResourcesMessage">
                  <p>Oops! Something went wrong! Failed to retrieve Jobs.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsListPage;
