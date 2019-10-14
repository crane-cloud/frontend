import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class NodesModal extends Component {
  // link/nodes/{ this.props.clusterID }
  nodesArray = [
    {
      nodeID: 345,
      name: 'aci-aws-worker-3',
      labels: 'beta.kubernetes.io/arch, amd64 beta.kubernetes.rr',
      ready: true,
      cpuRequests: '0.54 (30%)',
      cpuLimits: '1.2 (50%)',
      memoryRequests: '262.588 Mi (6.65%)',
      memoryLimits: '2.971 Gi (77.02%)',
      age: '2 years'
    },
    {
      nodeID: 305,
      name: 'aci-aws-worker-1',
      labels: 'beta.arch, amd64',
      ready: false,
      cpuRequests: '4.54 (30%)',
      cpuLimits: '1.9 (50%)',
      memoryRequests: '862.588 Mi (50.65%)',
      memoryLimits: '0.971 Gi (7.02%)',
      age: '5 months'
    }
  ]

  render() {
    return (
      <section>
        <Modal visible={this.props.visible} /* width="400"   height="300" */ effect="fadeInUp" onClickAway={() => this.props.closeModal()}>
          <div>
            <a href="javascript:void(0);" onClick={() => this.props.closeModal({ visibleNodesModal: false })}>Close</a>
            <h1>{this.props.title} {this.props.clusterID} Nodes</h1>
            {this.renderNodeTable()}
            <a href="javascript:void(0);" onClick={() => this.props.closeModal({ visibleNodesModal: false })}>Close</a>
          </div>
        </Modal>
      </section>
    );
  }

  renderNodeTable = () => (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Labels</th>
            <th scope="col">Ready</th>
            <th scope="col">CPU requests (cores)</th>
            <th scope="col">CPU limits (cores)</th>
            <th scope="col">Memory requests (bytes) </th>
            <th scope="col">Memory limits (bytes)</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            this.nodesArray.map((element) => {
              console.log(element.ready.toString());
              return (
                <tr key={this.nodesArray.indexOf(element)}>
                  <td> {element.name}</td>
                  <td> {element.labels} </td>
                  <td> {element.ready.toString()} </td>
                  <td> {element.cpuRequests} </td>
                  <td> {element.cpuLimits} </td>
                  <td> {element.memoryRequests} </td>
                  <td> {element.memoryLimits} </td>
                  <td> {element.age} </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
