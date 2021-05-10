import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./JobsListPage.css";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import getJobs from "../../redux/actions/jobs";
import Status from "../Status";
import Spinner from "../Spinner";
import tellAge from "../../helpers/ageUtility";

class JobsListPage extends React.Component {
  componentDidMount() {
    const { getJobs } = this.props;
    const {
      match: { params },
    } = this.props;
    getJobs(params.clusterID);
  }

  render() {
    const { jobs, isRetrieving, isFetched } = this.props;
    const clusterName = localStorage.getItem("clusterName");
    const {
      match: { params },
    } = this.props;

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
  }
}

JobsListPage.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
  isFetched: PropTypes.bool,
  isRetrieving: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getJobs: PropTypes.func.isRequired,
};

JobsListPage.defaultProps = {
  jobs: [],
  isRetrieving: false,
  isFetched: false,
};

const mapStateToProps = (state) => {
  const { isRetrieving, jobs, isFetched } = state.jobsReducer;
  return {
    isRetrieving,
    jobs,
    isFetched,
  };
};

const mapDispatchToProps = {
  getJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsListPage);
