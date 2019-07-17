import React , { Component } from "react";
import { Link } from 'react-router-dom';


import UserResourceUsage from "./components/user_resource_usage/userResourceUsage";

import "./LandingContent.css";

export default class LandingContent extends Component{

    // /user-id/organizations
    // eg /07/organizations
    organizationsArray =  [
        {
            name : "Makerere",
            orgID : 46782,
            status : "okey",
            billing : "200957"
        },
        {
            name : "KCCA",
            orgID : 46784,
            status : "error",
            billing : "489774"
        }
    ];

    // /user-id/organizations/org-id/deployments
    // eg /07/organizations/05/deployments
    deploymentsArray =  [
        {
            name : "Kampala Trains",
            deploymentID : 46373,
            status : "okey",
            billing : "2057483"
        },
        {
            name : "City Traders",
            deploymentID : 57480,
            status : "error",
            billing : "4895894"
        }
    ];

    state = {
        deploymentsListVisible : false,
        organizationsListVisible : false,
        organizationsArray : [],
        deploymentsArray : []
    }

    componentDidMount(){
        this.setState({
            organizationsArray : this.organizationsArray,
            deploymentsArray : this.deploymentsArray
        });
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
            <div>
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
                <UserResourceUsage />
            </div>
            );
    }

    returnDeploymentsCard = () => {
        let numberOfErrors = 0;
        let numberOfOkey = 0;
        let totalBilling = 0;

        this.state.deploymentsArray.map((deployment) => {
            if(deployment.status === "okey"){
                numberOfOkey = numberOfOkey + 1;
            } else if(deployment.status === "error"){
                numberOfErrors = numberOfErrors + 1;
            }

            totalBilling = parseFloat(totalBilling) + parseFloat(deployment.billing);
        })

        return (<div class="card-body text-center">
            <h4 onClick={this.toggleDeployments} className="hoverCursor">
                <span className={this.state.deploymentsListVisible ? "oi oi-minus pushPlusLeft" : "oi oi-plus pushPlusLeft"} ></span>
                Deployments
            <span class="badge badge-success aLittleMargin">Okay { numberOfOkey }</span>
                <span class="badge badge-danger aLittleMargin">Errors { numberOfErrors }</span>
            </h4>

            <div className={this.state.deploymentsListVisible ? "deploymentsListVisible" : "deploymentsListInvisible"}>
                <table class="table table-borderless text-left">
                    <thead>
                        <th>Name</th> 
                        <th>Status</th>
                        <th>Billing  (ugx { totalBilling })</th>
                    </thead>
                    <tbody>
                    {
                            this.state.deploymentsArray.map((deployment) => {
                                return (
                                    <tr >
                                        <td> { deployment.name }</td>     
                                        <td><span class={ `badge badge-${ deployment.status === 'okey' ? 'success' : 'danger' } aLittleMargin` }>{ deployment.status }</span></td> 
                                        <td>{ deployment.billing }</td>
                                    </tr>
                                );
                            })
                        }              
                    </tbody>
                </table>          
            </div>
        </div>)
    } 

    returnOrganizationsCard = () => {
        let numberOfErrors = 0;
        let numberOfOkey = 0;
        let totalBilling = 0;

        this.state.organizationsArray.map((org) => {
            if(org.status === "okey"){
                numberOfOkey = numberOfOkey + 1;
            } else if(org.status === "error"){
                numberOfErrors = numberOfErrors + 1;
            }

            totalBilling = parseFloat(totalBilling) + parseFloat(org.billing);
        })

        return (<div class="card-body text-center">
            <h4 onClick={this.toggleOrganizations} className="hoverCursor">
                <span className={this.state.organizationsListVisible ? "oi oi-minus pushPlusLeft" : "oi oi-plus pushPlusLeft"} ></span>
                Organizations
            <span class="badge badge-success aLittleMargin">Okay { numberOfOkey }</span>
                <span class="badge badge-danger aLittleMargin">Errors { numberOfErrors }</span>
            </h4>

            <div className={this.state.organizationsListVisible ? "organizationsListVisible" : "organizationsListInvisible"}>
               
                <table class="table table-borderless text-left">
                    <thead>
                        <th>Name</th> 
                        <th>Status</th>
                        <th>Billing  (ugx { totalBilling })</th>
                    </thead>
                    <tbody>
                    {
                            this.state.organizationsArray.map((org) => {
                                return (
                                    <tr >
                                        <td> <Link to={ `/user-organization/${org.orgID}` }> { org.name } </Link></td>     
                                        <td><span class={ `badge badge-${ org.status === 'okey' ? 'success' : 'danger' } aLittleMargin` }>{ org.status }</span></td> 
                                        <td>{ org.billing }</td>
                                    </tr>
                                );
                            })
                        }        
                    </tbody>
                </table>          
            </div>
        </div>)
    } 

}