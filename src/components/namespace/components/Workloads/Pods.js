import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchPodsSuccess,
    fetchPodsFailed,
    fetchPodsPending,
    fetchPodsRunning
} from "../../../../redux/actions/monitoring/fetchPods";

class Pods extends Component {

    componentWillMount() {
        this.props.fetchPodsRunning();
        this.props.fetchPodsPending();
        this.props.fetchPodsSuccess();
        this.props.fetchPodsFailed();
    }

    // link/nodes/{ this.props.clusterID }
    podsArray = [
        {
            podID: 345,
            name: "cm-acme-http-solver-nm6d5",
            node: "aci-aws-worker-3",
            status: "Running",
            restarts: "0",
            age: "8 days"
        },
        {
            podID: 346,
            name: "cm-acme-http-solver-mvnkd",
            node: "aci-aws-worker-2",
            status: "Running",
            restarts: "0",
            age: "10 days"
        },
        {
            podID: 347,
            name: "trial-prometheus-node-exporter-8hxsm",
            node: "aci-aws-master",
            status: "Running",
            restarts: "0",
            age: "10 days"
        }
    ]

    createTable = () => {
        return (<div>
            <table className="table table-striped" id="pods-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Node</th>
                        <th scope="col">Status</th>
                        <th scope="col">Restarts</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.podsArray.map((element) => {
                            return (
                                <tr key={this.podsArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.node} </td>
                                    <td> {element.status} </td>
                                    <td> {element.restarts} </td>
                                    <td> {element.age} </td>
                                    <td> {this.dropDown()} </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }

    dropDown = () => {
        return (
            <div className="dropdown">
                <div data-toggle="dropdown">
                    <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
                </div>
                <div className="dropdown-menu">
                    <button className="dropdown-item" type="button">Edit YAML</button>
                    <button className="dropdown-item" type="button">Delete Pod</button>
                </div>
            </div>
        )
    }


    renderPodsTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Pods
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    getPodsRunning = (podsRunning) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center">
                        Pods Running
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{podsRunning}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getPodsPending = (podsPending) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center pending">
                        Pending Pods
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{podsPending}</h1>
                    </div>
                </div>
            </div>
        );
    }

    podsSuccess = (podsSuccess) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Pods Succeeded
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{podsSuccess}</h1>
                    </div>
                </div>
            </div>
        );
    }

    podsFailing = (podsFail) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center fail">
                        Pods Failed
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{podsFail}</h1>
                    </div>
                </div>
            </div>
        );
    }


    renderPods = () => {
        const {
            podsRunning,
            podsPending,
            podsSuccess,
            podsFailed
        } = this.props;

        return (
            <div className="card parent">
                <div className="card-header">
                    Pods
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.getPodsRunning(podsRunning)}
                        {this.getPodsPending(podsPending)}
                    </div>
                    <div className="row">
                        {this.podsSuccess(podsSuccess)}
                        {this.podsFailing(podsFailed)}
                    </div>
                    <div className="row">
                        {this.renderPodsTable()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderPods()
        );
    }
}

Pods.propTypes = {
    fetchPodsRunning: PropTypes.func.isRequired,
    fetchPodsPending: PropTypes.func.isRequired,
    fetchPodsSuccess: PropTypes.func.isRequired,
    fetchPodsFailed: PropTypes.func.isRequired,
    podsRunning: PropTypes.string,
    podsPending: PropTypes.string,
    podsSuccess: PropTypes.string,
    podsFailed: PropTypes.string

}

const mapStateToProps = state => ({
    podsRunning: state.pods.podsRunning,
    podsPending: state.pods.podsPending,
    podsSuccess: state.pods.podsSuccess,
    podsFailed: state.pods.podsFailed
});

export default connect(
    mapStateToProps,
    {
        fetchPodsRunning,
        fetchPodsFailed,
        fetchPodsSuccess,
        fetchPodsPending
    }
)(Pods);