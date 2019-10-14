/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import ClusterHealth from './ClusterHealth';
import Containers from './Containers';

class ClusterInfo extends Component {
  render() {
    return (
      <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <ClusterHealth />
        <Containers />
      </div>
    );
  }
}

export default ClusterInfo;
