import React, { Component } from 'react';

class Deployments extends Component {

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

    createTable() {
        return (<div>
            <table className="table table-striped" id="deployments-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Labels</th>
                        <th scope="col">Pods</th>
                        <th scope="col">Age</th>
                        <th scope="col">Images</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.deploymentsArray.map((element) => {
                            return (
                                <tr key={this.deploymentsArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.label} </td>
                                    <td> {element.pods} </td>
                                    <td> {element.age} </td>
                                    <td> {element.images} </td>
                                    <td> {this.dropDown()} </td>
                                </tr>
                            );
                        })
                    }
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
        console.log(window.location.pathname)
        return (
            this.renderDeploymentsTable()
        )
    }
}

export default Deployments;