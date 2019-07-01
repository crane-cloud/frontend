import React, { Component } from 'react';

class Jobs extends Component {
    constructor() {
        super()
    }

    jobsSucceding() {
        const suceededJobs = 6;
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Jobs Succeeded
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{suceededJobs}</h1>
                    </div>
                </div>
            </div>
        );
    }

    jobsFailing() {
        const failedJobs = 1;
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center fail">
                        Jobs Failed
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{failedJobs}</h1>
                    </div>
                </div>
            </div>
        );
    }


    renderJobs() {
        return (
            <div className="card parent">
                <div className="card-header">
                    Jobs
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.jobsSucceding()}
                        {this.jobsFailing()}
                    </div>

                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderJobs()
        );
    }
}

export default Jobs;