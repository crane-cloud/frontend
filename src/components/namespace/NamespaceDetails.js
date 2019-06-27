import React, { Component } from 'react';

import "../../assets/css/namespace.css";

class NamespaceDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "React"
        }
    }

    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Namespace Name</h5>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Created</h6>
                        <p className="card-text">Date - Time</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Label</h6>
                        <p className="card-text">Label here</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                        <p className="card-text">Active</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NamespaceDetails;
