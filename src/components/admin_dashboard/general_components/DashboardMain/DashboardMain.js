import React, { Component } from "react";

import GenerateClusterRow from "./components/generateClusterRow";


export default class DashboardMain extends Component {

    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                {this.header()}
                <h2 className="text-center">Crane Cloud Clusters</h2>
                <GenerateClusterRow />
            </main>);
    }


    header = () => {
        return (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary"><span className="fa fa-plus"></span>  New Cluster</button>
                        <button className="btn btn-sm btn-outline-secondary">Export</button>
                        <button className="btn btn-sm btn-outline-secondary">Additional feature</button>
                    </div>
                </div>
            </div>
        )
    }
}