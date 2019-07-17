import React, { Component } from 'react';

import TopNav from "../../TopNav";
import SideNav from "../../sideNav"


class TotalResources extends Component {

    totalResources = {
        cpuUsage: "30%",
        memoryUsage: "40%",
        diskUsage: "27%"
    }

    cpuUsage = () => {

        return (
            <div className="col-4  my-4">
                <div className="card">
                    <div className="card-header text-center">
                        CPU USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.cpuUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }

    memoryUsage = () => {
        const failedJobs = 1;
        return (
            <div className="col-4  my-4">
                <div className="card">
                    <div className="card-header text-center">
                        MEMORY USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.memoryUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }

    diskUsage = () => {
        const failedJobs = 1;
        return (
            <div className="col-4  my-4">
                <div className="card">
                    <div className="card-header text-center">
                        STORAGE DISK USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.diskUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }


    renderUsage = () => { 
        return (
            <div className="row">
                {this.cpuUsage()}
                {this.memoryUsage()}
                {this.diskUsage()}
            </div>
        );
    }

    render() {
        return (
            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <TopNav />
                <div className="container-fluid">
                <SideNav />
                     { this.renderUsage() } 
                </div>
            </div>
        );
    }
}

export default TotalResources;