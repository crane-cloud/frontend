import React, { Component } from 'react';

class TotalResources extends Component {

    totalResources = {
        cpuUsage: "30%",
        memoryUsage: "40%",
        diskUsage: "27%"
    }

    cpuUsage() {
        
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center success">
                        CPU USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.cpuUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }

    memoryUsage() {
        const failedJobs = 1;
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center fail">
                        MEMORY USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.memoryUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }

    diskUsage() {
        const failedJobs = 1;
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center fail">
                        STORAGE DISK USAGE
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.totalResources.diskUsage}</h1>
                    </div>
                </div>
            </div>
        );
    }


    renderUsage() {
        return (
            <div className="card parent">
                <div className="card-header">
                    Jobs
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.cpuUsage()}
                        {this.memoryUsage()}
                        {this.diskUsage()}
                    </div>

                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderUsage()
        );
    }
}

export default TotalResources;