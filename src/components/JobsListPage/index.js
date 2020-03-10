import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './JobsListPage.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import getJobs from '../../redux/actions/JobsActions';
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
    const { jobs, isRetrieving } = this.props;
    const clusterName = localStorage.getItem('clusterName');

    return (
      <div>
        <NavBar />
        <div className="MainSection">
          <div className="SiteSideNav">
            <SideNav clusterName={clusterName} clusterId={this.props.match.params.clusterID} />
          </div>
          <div className="Content">
            <div className="UpperBar">
              <InformationBar header="Jobs" showBtn={false} />
            </div>
            <div className="LowerBar">
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
                          jobs.length !== 0 ? (
                            jobs.map((job) => (
                              <tr>
                                <td>{job.metadata.name}</td>
                                <td>{`${Math.floor((Date.parse(job.status.completionTime) - Date.parse(job.status.startTime)) / 1000)} seconds`}</td>
                                <td><Status status={job.status.succeeded} /></td>
                                <td>{tellAge(job.metadata.creationTimestamp)}</td>
                              </tr>
                            )))
                            : (
                              <tr>
                                <div className="EmptyList">
                                  <h3>No Jobs Available</h3>
                                </div>
                              </tr>
                            )
                        }
                      </tbody>
                    )
                  }
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JobsListPage.propTypes = {
  jobs: PropTypes.object,
  isRetrieving: PropTypes.bool,
};

JobsListPage.defaultProps = {
  jobs: [],
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, jobs } = state.JobsReducer;
  return { isRetrieving, jobs };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJobs
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsListPage);
