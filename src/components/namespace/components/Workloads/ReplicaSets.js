import React, { Component } from 'react';

class ReplicaSets extends Component {

    replicaSetsArray = [
        {
            replicaSetID: 346,
            name: "nfs-client-provisioner-54bd7c49f6",
            labels: "app: nfs-client-provisioner pod-template-hash: 1068370592",
            pods: "0/1",
            age: "9 days",
            images: "quay.io/external_storage/nfs-client-provisioner:latest"
        },
        {
            replicaSetID: 346,
            name: "nfs-client-provisioner-54bd7c49f6",
            labels: "app: nfs-client-provisioner pod-template-hash: 1068370592",
            pods: "0/1",
            age: "9 days",
            images: "quay.io/external_storage/nfs-client-provisioner:latest"
        },
        {
            replicaSetID: 346,
            name: "nfs-client-provisioner-54bd7c49f6",
            labels: "app: nfs-client-provisioner pod-template-hash: 1068370592",
            pods: "0/1",
            age: "9 days",
            images: "quay.io/external_storage/nfs-client-provisioner:latest"
        }
    ]

    createTable() {
        return (<div>
            <table className="table table-striped custom-table">
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
                        this.replicaSetsArray.map((element) => {
                            return (
                                <tr key={this.replicaSetsArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.labels} </td>
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
                    <button className="dropdown-item" type="button">Delete</button>
                </div>
            </div>
        )
    }

    renderRepSetsTable() {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Replica Sets
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }
    
    

    render() {
        return (
            this.renderRepSetsTable()
        )
    }
}

export default ReplicaSets;