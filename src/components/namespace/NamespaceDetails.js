import React, { Component } from 'react';

import "../../assets/css/namespace.css";

class NamespaceDetails extends Component {
    

    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">City Bank</h5>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Created</h6>
                        <p className="card-text">15/8/2018 - 14:04</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Label</h6>
                        <p className="card-text">app: city-bank-client-provisioner</p>
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
