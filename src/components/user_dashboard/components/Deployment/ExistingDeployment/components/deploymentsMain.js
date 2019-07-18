import React , { Component } from "react";

import Header from "../../../MainSection/components/header/header";
import DeploymentRow from "./components/deploymentRow";


export default class DeploymentsMain extends Component{

    // deployment id available at this.props.depID
    // /deployments/deploymentID
    // eg /deployments/4637

    deployment = {
        name : "depName",
        billing : "46722",
        storage : "900 MB",
        cpuCycles : "1.3 cores",
        memory : "360 MB",
        bandWidth : "1 GB"
    }

    render(){
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Header />
                    <h2 className="text-center headingMargin ">{ this.deployment.name }  UGX { this.deployment.billing}</h2>
                    <DeploymentRow deployment={this.deployment}/>
            </main>
         );
    }
}