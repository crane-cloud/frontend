import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import Modal from 'react-awesome-modal';

import  NodesModal  from "./modalComponents/NodeModal";



export default class clusterCard extends Component {
    state = {
        visible : false
    };

    openModal = () => {
        this.setState({
            visible : true
        });
    }

    closeModal = () => {
        this.setState({
            visible : false
        });
    }

render(){
    return (
        this.clusterCard()
    );
}

clusterCard = () => {
    return (
        <div className="col-4  my-4">
                    <div className="card text-center">
                        { this.renderCardHeader() }
                        { this.createCardBody() }
                        <div className="card-footer text-muted">
                            { this.props.cluster.date_of_creation }
              </div>
                    </div>
                </div>
    )
}

createCardBody = () => {
    
    let data= {
        labels: ["Mon", "Teu", "Wed", "Thur", "Fri", 'Sat', "Sun"],
        datasets: [{
        label: "Resource Usage",
        backgroundColor: 'rgb(30,144,255)',
        borderColor: 'rgb(30,144,255)',
        data: this.props.cluster.data,
        }]
    };

    return (
        <div className="card-body">
            { /* <p className="card-text">GRAPH</p> */ }
            { /* GRAPH */ }

            < Line data={ data } />            



            <div className="btn-group mr-2">
                { this.renderErrors() }
                { this.renderNameSpaces() }
            </div>
        </div>
    );
}

renderErrors = () => {
    return (
        <span>
            <button className="btn btn-sm btn-outline-danger" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Errors <span className="badge badge-danger"> {this.props.cluster.errors.length} </span> </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
                { /* errors dropdown */}
                {
                    this.props.cluster.errors.map((error) => {
                        return <button className="dropdown-item" type="button" key={error.error_id}> {error.error} </button>
                    })
                }
            </div>
        </span>
    );
}

renderNameSpaces = () => {
    return (
        <span>
            <button className="btn btn-sm btn-outline-secondary" id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Name spaces <span className="badge badge-secondary">{ this.props.cluster.nameSpaces.length }</span> </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu4">
                {
                    this.props.cluster.nameSpaces.map((namespace) => {
                        return <button className="dropdown-item" type="button" key = { namespace.nameSpaceId }> <Link to="/namespaces"> { namespace.name } </Link> </button>
                    })
                }
            </div>
        </span>
    );
}

renderCardHeader = () => {
    return (
        <div className="card-header">
            <div className="row">
                <div className="col-4">{this.props.cluster.name}</div>
                <div className="col-4">
                    <div className={`ParentDot${this.props.cluster.status} mx-auto`}>
                        {this.props.cluster.status}
                    </div>
                </div>
                <div className="col-4">
                    <div className="dropdown">
                        <div id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <a href="#"> <span className="oi oi-ellipses"></span> </a>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" onClick={() => this.openModal() }>Nodes <span className="badge badge-info"> 3 </span> </button>
                            <button className="dropdown-item" type="button">Persistent Volumes <span className="badge badge-info"> 0 </span> </button>
                            <button className="dropdown-item" type="button">Rename Cluster</button>
                            <button className="dropdown-item" type="button">Delete Cluster</button>
                        </div>
                    </div>
                </div>
            </div>
            <NodesModal  
                title = { this.props.cluster.name }
                closeModal = { this.closeModal }
                visible = { this.state.visible }
                clusterID = { this.props.cluster.cluster_id }
            />
        </div>
    );
}

renderNodesModal = (name) => {
    return (
        <section>
            <Modal visible={this.state.visible} width="400"  /* height="300" */  effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    <h1>{ name }</h1>
                    <p>Some Contents</p>
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                </div>
            </Modal>
        </section>
    );
}

}