import React, { Component } from 'react';


export default class DeploymentRow extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6  mb-5">
          <div className="card">
            <div className="card-body text-center">
              <h4> Storage </h4>
              <p> { this.props.deployment.storage } used</p>
            </div>
          </div>
        </div>

        <div className="col-6  mb-5">
          <div className="card">
            <div className="card-body text-center ">
              <h4> CPU cycles </h4>
              <p> average { this.props.deployment.cpuCycles } cores used</p>
            </div>
          </div>
        </div>

        <div className="col-6  mb-5">
          <div className="card">
            <div className="card-body text-center">
              <h4> Memory Consumption </h4>
              <p> average { this.props.deployment.memory } used</p>
            </div>
          </div>
        </div>

        <div className="col-6  mb-5">
          <div className="card">
            <div className="card-body text-center">
              <h4> Bandwidth </h4>
              <p> average { this.props.deployment.bandWidth } used</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
