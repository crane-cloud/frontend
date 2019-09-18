import React, { Component } from "react";
import NewDeployment from "../../Deployment/NewDeployment/NewDeployment";
import NewOrganization from "../../Organization/components/NewOrganiztion";


export default class Header extends Component {

    state = {
        visibleNewDeploymentModal: false,
        newOrganizationModal: false
    };

    openModal = (stateObj) => {
        this.setState(stateObj);
    }

    closeModal = (stateObj) => {
        this.setState(stateObj);
    }


    render() {
        return (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => this.openModal({ visibleNewDeploymentModal: true })}><span className="fa fa-plus"></span>  New Deployment</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => this.openModal({ newOrganizationModal: true })}><span className="fa fa-plus"></span>  New Organization</button>
                        <button className="btn btn-sm btn-outline-secondary">Export</button>
                        <button className="btn btn-sm btn-outline-secondary">Additional feature</button>
                    </div>
                </div>
                <NewDeployment closeModal={this.closeModal} visible={this.state.visibleNewDeploymentModal} />
                <NewOrganization closeModal={this.closeModal} visible={this.state.newOrganizationModal} />
            </div>
        )
    }
}