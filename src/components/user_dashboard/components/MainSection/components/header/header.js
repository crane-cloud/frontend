import React , { Component } from "react";
import NewDeployment from "../../../Deployment/NewDeployment/NewDeployment";


export default class Header extends Component{

    state = {
        visibleNewDeploymentModal: false
    };

    openModal = (stateObj) => {
        this.setState(stateObj);
    }

    closeModal = (stateObj) => {
        this.setState(stateObj);
    }


    render(){
        return (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => this.openModal({ visibleNewDeploymentModal: true })}>New Deployment <span className="oi oi-plus"></span> </button>
                            <button className="btn btn-sm btn-outline-secondary">New Organization <span className="oi oi-plus"></span> </button>
                            <button className="btn btn-sm btn-outline-secondary">Export</button>
                            <button className="btn btn-sm btn-outline-secondary">Additional feature</button>
                        </div>
                    </div>
                    <NewDeployment closeModal={this.closeModal} visible={this.state.visibleNewDeploymentModal} />
                </div>
        )
    }
}