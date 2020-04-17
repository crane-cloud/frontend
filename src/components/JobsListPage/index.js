import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './JobsListPage.css';
import Header from '../Header';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getJobs from '../../redux/actions/jobs';
import Status from '../Status';
import { BigSpinner } from '../SpinnerComponent';
import tellAge from '../../helpers/ageUtility';

class JobsListPage extends React.Component {
  componentDidMount() {
    const { getJobs } = this.props;
    const { match: { params } } = this.props;
    getJobs(params.clusterID);
  }

  render() {
    const {
      jobs, isRetrieving, isFetched
    } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    const { match: { params } } = this.props;

    return (
      <div className="MainPage">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Jobs" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="ResourcesTable">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                  {
                    isRetrieving ? (
                      <tr className="TableLoading">
                        <div className="SpinnerWrapper">
                          <BigSpinner />
                        </div>
                      </tr>
                    ) : (
                      <tbody>
                        {
                          (isFetched && jobs !== undefined) && (
                            jobs.map((job) => (
                              <tr>
                                <td>{job.metadata.name}</td>
                                <td>{`${Math.floor((Date.parse(job.status.completionTime) - Date.parse(job.status.startTime)) / 1000)} seconds`}</td>
                                <td><Status status={job.status.succeeded} /></td>
                                <td>{tellAge(job.metadata.creationTimestamp)}</td>
                              </tr>
                            )))
                        }
                      </tbody>
                    )
                  }
                </table>
                {(isFetched && jobs.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No Jobs Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Jobs.
                    </p>
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
};

JobsListPage.defaultProps = {
  jobs: [],
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const {
    isRetrieving, jobs, isFetched
  } = state.JobsReducer;
  return {
    isRetrieving, jobs, isFetched
  };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJobs
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsListPage);
