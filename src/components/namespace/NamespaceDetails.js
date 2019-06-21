import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopNav from "../admin_dashboard/general_components/TopNav";
import NamespaceTable from "./NamespaceTable";
// import Deployments from "./components/subcomponents/workloads/Deployments"; // TODO: Route Components
// import ReplicaSets from "./components/subcomponents/workloads/ReplicaSets";
// import Controllers from "./components/subcomponents/workloads/ReplicationControllers"
// import DeamonSets from "./components/subcomponents/workloads/DeamonSets"

import "../../assets/css/namespace.css";

class Namespace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "React"
        }
    }

    renderDetails = () => {
        return (
            <div className="card first" >
                <div className="card-body">
                    <h5 className="card-title">Namespace Name</h5>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Created</h6>
                        <p className="card-text">Date - Time</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Label</h6>
                        <p className="card-text">Label here</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                        <p className="card-text">Active</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav />
                {this.renderDetails()}
                <NamespaceTable />
            </div>
        )
    }
}

export default Namespace;
