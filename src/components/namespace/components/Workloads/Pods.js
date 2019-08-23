import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPodsSuccess,
  fetchPodsFailed,
  fetchPodsPending,
  fetchPodsRunning,
  fetchPodsTable
} from "../../../../redux/actions/monitoring/fetchPods";

class Pods extends Component {

  componentWillMount() {
    this.props.fetchPodsTable();
    this.props.fetchPodsRunning();
    this.props.fetchPodsPending();
    this.props.fetchPodsSuccess();
    this.props.fetchPodsFailed();
  }

  // link/nodes/{ this.props.clusterID }
  createTable = () => {
    if (this.props.podsArray.length !== 0) {
      return (
        <div>
          <table className="table table-striped" id="pods-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Node</th>
                <th scope="col">Status</th>
                <th scope="col">Restarts</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.podsArray.map((element) => {
                  return (
                    <tr key={this.props.podsArray.indexOf(element)}>
                      <td> {element.metadata.name}</td>
                      <td> {element.spec.nodeName}</td>
                      <td> {element.status.phase}</td>
                      {/* <td> {element.containerStatuses[0].restartCount}</td> */}
                      <td>-</td>
                      <td>-</td>
                      <td> {this.dropDown()} </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else {
      return;
    }
  }

  dropDown = () => {
    return (
      <div className="dropdown">
        <div data-toggle="dropdown">
          <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
        </div>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">Edit YAML</button>
          <button className="dropdown-item" type="button">Delete Pod</button>
        </div>
      </div>
    )
  }


  renderPodsTable = () => {
    return (
      <div className="card col-sm-12">
        <div className="card-header text-center">
          Pods
                    </div>
        <div className="card-body">
          {this.createTable()}
        </div>
      </div>

    );
  }

  getPodsRunning = (podsRunning) => {
    return (
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header text-center">
            Pods Running
                    </div>
          <div className="card-body">
            <h1 className="card-title text-center">{podsRunning}</h1>
          </div>
        </div>
      </div>
    );
  }

  getPodsPending = (podsPending) => {
    return (
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header text-center pending">
            Pending Pods
                    </div>
          <div className="card-body">
            <h1 className="card-title text-center">{podsPending}</h1>
          </div>
        </div>
      </div>
    );
  }

  podsSuccess = (podsSuccess) => {
    return (
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header text-center success">
            Pods Succeeded
                    </div>
          <div className="card-body">
            <h1 className="card-title text-center">{podsSuccess}</h1>
          </div>
        </div>
      </div>
    );
  }

  podsFailing = (podsFail) => {
    return (
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header text-center fail">
            Pods Failed
          </div>
          <div className="card-body">
            <h1 className="card-title text-center">{podsFail}</h1>
          </div>
        </div>
      </div>
    );
  }


  renderPods = () => {
    const {
      podsRunning,
      podsPending,
      podsSuccess,
      podsFailed
    } = this.props;

    return (
      <div className="card parent">
        <div className="card-header">
          Pods
                </div>
        <div className="card-body">
          <div className="row">
            {this.getPodsRunning(podsRunning)}
            {this.getPodsPending(podsPending)}
          </div>
          <div className="row">
            {this.podsSuccess(podsSuccess)}
            {this.podsFailing(podsFailed)}
          </div>
          <div className="row">
            {this.renderPodsTable()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      this.renderPods()
    );
  }
}

Pods.propTypes = {
  fetchPodsRunning: PropTypes.func.isRequired,
  fetchPodsPending: PropTypes.func.isRequired,
  fetchPodsSuccess: PropTypes.func.isRequired,
  fetchPodsFailed: PropTypes.func.isRequired,
  fetchPodsTable: PropTypes.func.isRequired,
  podsRunning: PropTypes.string,
  podsPending: PropTypes.string,
  podsSuccess: PropTypes.string,
  podsFailed: PropTypes.string,
  podsArray: PropTypes.array.isRequired

}

const mapStateToProps = state => ({
  podsArray: state.pods.podsArray,
  podsRunning: state.pods.podsRunning,
  podsPending: state.pods.podsPending,
  podsSuccess: state.pods.podsSuccess,
  podsFailed: state.pods.podsFailed
});

export default connect(
  mapStateToProps,
  {
    fetchPodsTable,
    fetchPodsRunning,
    fetchPodsFailed,
    fetchPodsSuccess,
    fetchPodsPending
  }
)(Pods);