import React, { Component } from 'react';

class Deployments extends Component {
    constructor() {
        super()
        this.state = {
            deploymentsArray: null
        }
    }

    deploymentsArray = [
        {
            deploymentID: 345,
            name: "nfs-client-provisioner",
            label: "app: nfs-client-provisioner",
            pods: "0/1",
            age: "21 days",
            images: "quay.io/external_storage/nfs-client-provisioner:latest"
        },
        {
            deploymentID: 345,
            name: "nfs-client-provisioner",
            label: "app: nfs-client-provisioner",
            pods: "0/1",
            age: "21 days",
            images: "quay.io/external_storage/nfs-client-provisioner:latest"
        }
    ]

    getDeployments = () => {
        // let deployments = null;
        const apiRoute = 'http://54.84.186.47:31765/monitor/deployment/replicas/info';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.printDataToTable(data.data.result);

            })
            .catch(() => console.log("Cant access " + apiRoute));
    }

    printDataToTable = (array) => {
        array.map((element) => {
            return (
                <tr key={this.state.deploymentsArray.indexOf(element)}>
                    <td> {element.metric.deployment}</td>
                    <td> {element.metric.kubernetes_node} </td>
                    <td> {element.metric.namespace} </td>
                    <td> {element.value[1]} </td>

                    <td> {this.dropDown()} </td>
                </tr>
            );
        })
    }

    createTable() {
        return (<div>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Node</th>
                        <th scope="col">Namespace</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getDeployments()}
                </tbody>
            </table>
        </div>
        );
    }

    dropDown() {
        return (
            <div className="dropdown">
                <div data-toggle="dropdown">
                    <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
                </div>
                <div className="dropdown-menu">
                    <button className="dropdown-item" type="button">Edit YAML</button>
                    <button className="dropdown-item" type="button">Scale</button>
                    <button className="dropdown-item" type="button">Delete Deployment</button>
                </div>
            </div>
        )
    }

    renderDeploymentsTable() {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Deployments
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    render() {
        return (
            this.renderDeploymentsTable()
        )
    }
}

export default Deployments;