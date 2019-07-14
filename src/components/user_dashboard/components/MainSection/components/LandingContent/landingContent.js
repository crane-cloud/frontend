import React , { Component } from "react";

import "./LandingContent.css";

export default class LandingContent extends Component{
    state = {
        deploymentsListVisible : false,
        organizationsListVisible : false,
    }

    toggleDeployments = () => {
        const status = this.state.deploymentsListVisible;
        this.setState({ deploymentsListVisible : !status });
    }

    toggleOrganizations = () => {
        const status = this.state.organizationsListVisible;
        this.setState({ organizationsListVisible : !status });
    }

    render(){
        return (
            <div class="row">
                <div class="col">
                    <div class="card">
                        { this.returnDeploymentsCard() }
                    </div>
                </div>

                <div class="col">
                <div class="card">
                        { this.returnOrganizationsCard() }
                    </div>
                </div>
            </div>
            );
    }

    returnDeploymentsCard = () => {
        return (<div class="card-body text-center">
            <h4 onClick={this.toggleDeployments} className="hoverCursor">
                <span className={this.state.deploymentsListVisible ? "oi oi-minus pushPlusLeft" : "oi oi-plus pushPlusLeft"} ></span>
                Deployments
            <span class="badge badge-success aLittleMargin">Okay 5</span>
                <span class="badge badge-danger aLittleMargin">Errors 2</span>
            </h4>

            <div className={this.state.deploymentsListVisible ? "deploymentsListVisible" : "deploymentsListInvisible"}>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-danger aLittleMargin">Check Error</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-danger aLittleMargin">Check Error</span> </p>
            </div>
        </div>)
    } 

    returnOrganizationsCard = () => {
        return (<div class="card-body text-center">
            <h4 onClick={this.toggleOrganizations} className="hoverCursor">
                <span className={this.state.organizationsListVisible ? "oi oi-minus pushPlusLeft" : "oi oi-plus pushPlusLeft"} ></span>
                Organizations
            <span class="badge badge-success aLittleMargin">Okay 5</span>
                <span class="badge badge-danger aLittleMargin">Errors 2</span>
            </h4>

            <div className={this.state.organizationsListVisible ? "organizationsListVisible" : "organizationsListInvisible"}>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-success aLittleMargin">Okay</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-danger aLittleMargin">Check Error</span> </p>
                <p> hshshs shshshs shshsh  <span class="badge badge-danger aLittleMargin">Check Error</span> </p>
            </div>
        </div>)
    } 

}