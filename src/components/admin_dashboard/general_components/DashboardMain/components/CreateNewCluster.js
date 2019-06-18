import React, { Component } from "react";


export default class CreateNewCluster extends Component {
    render(){
        return (
            this.createNewCluster()
        )
    }

    createNewCluster = () => {
        return (
            <div className="col-4">
                        <div className="card text-center">
                            <div className="card-header">

                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Create a new cluster</h5>
                                <div className="card-text">
                                    <a href="#">
                                        <span className="oi oi-plus"></span>
                                    </a>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                Create new cluster
                    </div>
                        </div>
                    </div>
        )
    }
} 
