import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "../../TopNav";
import SideNav from "../../sideNav";
import { Doughnut } from 'react-chartjs-2';


class ClusterInfo extends Component {

    data = {
        labels: "Free",
        value: 50
        };

    getCpuUsage = () => {
        return (
            <div className="card">
                <div className="card-header">
                    Cluster CPU Usage
                </div>
                <div className="card-body">
                    <Doughnut data={this.data}/>
                </div>
            </div>
        )
    }

    renderClusterHealth = () => {
        return (
            <div className="row">
                <div className="column-3">
                    {this.getCpuUsage()}
                </div>
                <div className="column-3">
                    {this.getCpuUsage()}
                </div>
                <div className="column-3">
                    {this.getCpuUsage()}
                </div>
                <div className="column-3">
                    {this.getCpuUsage()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <TopNav />
                <div className="container-fluid">
                    <SideNav />
                    {this.renderClusterHealth()}
                </div>
            </div>
        );
    }
}

export default ClusterInfo;