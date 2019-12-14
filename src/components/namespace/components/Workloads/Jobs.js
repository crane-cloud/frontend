import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchJobsSuccess, fetchJobsFailed } from '../../../../redux/actions/monitoring/fetchJobs';

class Jobs extends Component {
  componentWillMount() {
    this.props.fetchJobsFailed();
    this.props.fetchJobsSuccess();
  }


    renderJobs = () => {
      const { jobsFailed, jobsSucceeded } = this.props;

      return (
        <div className="card parent">
          <div className="card-header">
                    Jobs
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-header text-center success">
                                    Jobs Succeeded
                  </div>
                  <div className="card-body">
                    <h1 className="card-title text-center">{jobsSucceeded}</h1>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-header text-center fail">
                                    Jobs Failed
                  </div>
                  <div className="card-body">
                    <h1 className="card-title text-center">{jobsFailed}</h1>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }

    render() {
      return (
        this.renderJobs()
      );
    }
}

Jobs.propTypes = {
  fetchJobsSuccess: PropTypes.func.isRequired,
  fetchJobsFailed: PropTypes.func.isRequired,
  jobsFailed: PropTypes.string,
  jobsSucceeded: PropTypes.string
};

const mapStateToProps = (state) => ({
  jobsFailed: state.jobs.jobsFailed,
  jobsSucceeded: state.jobs.jobsSucceeded
});

export default connect(mapStateToProps, { fetchJobsFailed, fetchJobsSuccess })(Jobs);
