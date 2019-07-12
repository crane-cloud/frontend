import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import Modal from 'react-awesome-modal';

import NodesModal from "./modalComponents/NodeModal";
import PersistentVolumesModal from "./modalComponents/PersistentVolumesModal"



export default class clusterCard extends Component {
    state = {
        visibleNodesModal: false,
        visiblePersistentVolumesModal: false
    };

    openModal = (stateObj) => {
        this.setState(stateObj);
    }

    closeModal = (stateObj) => {
        this.setState(stateObj);
    }

    render() {
        return (
            this.clusterCard()
        );
    }

    clusterCard = () => {
        return (
            <div className="col-4  my-4">
                <div className="card text-center">
                    {this.renderCardHeader()}
                    {this.createCardBody()}
                    <div className="card-footer text-muted">
                        {this.props.cluster.date_of_creation}
                    </div>
                </div>
            </div>
        )
    }

    createCardBody = () => {

        let data = {
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri", 'Sat', "Sun"],
            datasets: [{
                label: "Resource Usage",
                backgroundColor: 'rgb(30,144,255)',
                borderColor: 'rgb(30,144,255)',
                data: this.props.cluster.data,
            }]
        };

        return (
            <div className="card-body">
                { /* <p className="card-text">GRAPH</p> */}
                { /* GRAPH */}

                < Line data={data} />

                <div className="btn-group mr-2">
                    {this.renderErrors()}
                    {this.renderNameSpaces()}
                </div>
            </div>
        );
    }

    renderErrors = () => {
        return (
            <span>
                <button className="btn btn-sm btn-outline-danger" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Errors <span className="badge badge-danger"> {this.props.cluster.errors.length} </span> </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
                    { /* errors dropdown */}
                    {
                        this.props.cluster.errors.map((error) => {
                            return <button className="dropdown-item" type="button" key={error.error_id}> {error.error} </button>
                        })
                    }
                </div>
            </span>
        );
    }

    renderNameSpaces = () => {
        return (
            <span>
                <button className="btn btn-sm btn-outline-secondary" id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Name spaces <span className="badge badge-secondary">{this.props.cluster.nameSpaces.length}</span> </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu4">
                    {
                        this.props.cluster.nameSpaces.map((namespace) => {
                            return <button className="dropdown-item" type="button" key={namespace.nameSpaceId}>
                                <Link to={{
                                    pathname: `/namespaces/${namespace.nameSpaceId}`,
                                    state: {
                                        nameSpace: namespace
                                    },
                                }}>
                                    {namespace.name} </Link> </button>
                        })
                    }
                </div>
            </span>
        );
    }

    renderCardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-4">{this.props.cluster.name}</div>
                    <div className="col-4">
                        <div className={`ParentDot${this.props.cluster.status} mx-auto`}>
                            {this.props.cluster.status}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <div id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <a href="#"> <span className="fa fa-info-circle"></span></a>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button" onClick={() => this.openModal({ visibleNodesModal: true })} >Nodes <span className="badge badge-info"> 3 </span> </button>
                                <button className="dropdown-item" type="button" onClick={() => this.openModal({ visiblePersistentVolumesModal: true })} >Persistent Volumes <span className="badge badge-info"> 0 </span> </button>
                                <button className="dropdown-item" type="button"><Link to="/cluster-info">View Cluster Info</Link></button>
                                <button className="dropdown-item" type="button">Rename Cluster</button>
                                <button className="dropdown-item" type="button">Delete Cluster</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <NodesModal
                    title={this.props.cluster.name}
                    closeModal={this.closeModal}
                    visible={this.state.visibleNodesModal}
                    clusterID={this.props.cluster.cluster_id}
                />

                <PersistentVolumesModal
                    title={this.props.cluster.name}
                    closeModal={this.closeModal}
                    visible={this.state.visiblePersistentVolumesModal}
                    clusterID={this.props.cluster.cluster_id}
                />
            </div>
        );
    }

}