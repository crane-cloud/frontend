import React, { Component } from 'react';

import "../../assets/css/namespace.css";

class NamespaceDetails extends Component {
    

    render() {
        const { nameSpace } = this.props;
        console.log( nameSpace );
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{ nameSpace.name }</h5>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Created</h6>
                        <p className="card-text">{ nameSpace.dateCreated }</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Label</h6>
                        <p className="card-text">{ nameSpace.label }</p>
                    </div>
                    <div className="card-item">
                        <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                        <p className="card-text">{ nameSpace.status }</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NamespaceDetails;
