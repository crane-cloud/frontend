import React, { Component } from 'react';

class Secrets extends Component {
    secretsArray = [
      {
        secretID: 1,
        name: 'trial-prometheus-node-exporter-token-9w57j',
        type: 'kubernetes.io/service-account-token',
        age: '10 days'
      },
      {
        secretID: 2,
        name: 'nfs-client-provisioner-token-xjh55',
        type: 'kubernetes.io/service-account-token',
        age: '21 days'
      },
      {
        secretID: 3,
        name: 'ambassador-token-jfkp4',
        type: 'kubernetes.io/service-account-token',
        age: '1 month'
      },
      {
        secretID: 4,
        name: 'tensorflow   ',
        type: 'kubernetes.io/tls',
        age: '6 months'
      }
    ]

    createTable = () => (<div>
      <table className="table table-striped custom-table" >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            this.secretsArray.map((element) => (
              <tr key={this.secretsArray.indexOf(element)}>
                <td> {element.name}</td>
                <td> {element.type} </td>
                <td> {element.age} </td>
                <td> {this.dropDown()} </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )

    dropDown = () => (
      <div className="dropdown">
        <div data-toggle="dropdown">
          <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
        </div>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">Edit YAML</button>
          <button className="dropdown-item" type="button">Delete Service</button>
        </div>
      </div>
    )

    renderSecretsTable = () => (
      <div className="card col-sm-12">
        <div className="card-header text-center">
                    Secrets
        </div>
        <div className="card-body">
          {this.createTable()}
        </div>
      </div>

    )


    render() {
      return (
        this.renderSecretsTable()
      );
    }
}

export default Secrets;
