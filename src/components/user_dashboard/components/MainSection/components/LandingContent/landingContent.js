import React , { Component } from "react";
import { Link } from 'react-router-dom';


import UserResourceUsage from "./components/user_resource_usage/userResourceUsage";

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
        return (<div class="card-body text-center">
            <h4 onClick={this.toggleDeployments} className="hoverCursor">
                <span className={this.state.deploymentsListVisible ? "oi oi-minus pushPlusLeft" : "oi oi-plus pushPlusLeft"} ></span>
                Deployments
            <span class="badge badge-success aLittleMargin">Okay 5</span>
                <span class="badge badge-danger aLittleMargin">Errors 2</span>
            </h4>

            <div className={this.state.deploymentsListVisible ? "deploymentsListVisible" : "deploymentsListInvisible"}>
                <table class="table table-borderless text-left">
                    <thead>
                        <th>Name</th> 
                        <th>Status</th>
                        <th>Billing  (ugx 2,334,590)</th>
                    </thead>
                    <tbody>
                        <tr >
                            <td>Kampala Trians</td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 25,000</td>
                        </tr> 
                        <tr>
                            <td>City Traders</td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 25,00</td>
                        </tr>        
                        <tr>
                            <td>City high school</td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 300,000</td>
                        </tr>  
                        <tr>
                            <td>Wandegeya market</td>     
                            <td><span class="badge badge-danger aLittleMargin">Check error</span></td> 
                            <td>UGX 700,00</td>
                        </tr>  
                        <tr>
                            <td>Kiseka market</td>     
                            <td><span class="badge badge-danger aLittleMargin">Check error</span></td> 
                            <td>UGX 860,00</td>
                        </tr>    
                                
                    </tbody>
                </table>          
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
               
                <table class="table table-borderless text-left">
                    <thead>
                        <th>Name</th> 
                        <th>Status</th>
                        <th>Billing  (ugx 1,300,590)</th>
                    </thead>
                    <tbody>
                        <tr >
                            <td><Link to="/user-organization">Makerere</Link></td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 25,000</td>
                        </tr> 
                        <tr>
                            <td>KCCA</td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 25,00</td>
                        </tr>        
                        <tr>
                            <td>Biomed Tech</td>     
                            <td><span class="badge badge-success aLittleMargin">Okay</span></td> 
                            <td>UGX 300,000</td>
                        </tr>  
                        <tr>
                            <td>city oil</td>     
                            <td><span class="badge badge-danger aLittleMargin">Check error</span></td> 
                            <td>UGX 700,00</td>
                        </tr>  
                        <tr>
                            <td>Move app</td>     
                            <td><span class="badge badge-danger aLittleMargin">Check error</span></td> 
                            <td>UGX 860,00</td>
                        </tr>    
                                
                    </tbody>
                </table>          
            </div>
        </div>)
    } 

}