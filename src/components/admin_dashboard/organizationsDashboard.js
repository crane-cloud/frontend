import React , { Component } from "react";

import TopNav from "./general_components/TopNav";
import SideNav from "./general_components/sideNav";

import "../../assets/css/dashbaord.css";
import "../../assets/css/styleClusterStatus.css";


export default class OrganizationsDashboard extends Component{

    render(){
        return (
            <div>
                <TopNav />
                <div className="container-fluid">
                    <SideNav />
                    { this.main() }
                </div>
            </div>
        );
    }

    main = () => {
        return (<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    { this.head() }
                    <h2 className="text-center">Osprey Organizations</h2>
                    
            </main>);
    }

    head = () => {
        return (<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
                <button className="btn btn-sm btn-outline-secondary">New Cluster <span className="oi oi-plus"></span> </button>
                <button className="btn btn-sm btn-outline-secondary">Export</button>
                <button className="btn btn-sm btn-outline-secondary">Additional feature</button>
            </div>
        </div>
    </div>);
    }
}