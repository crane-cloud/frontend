import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchContainersRunning,
    fetchContainersWaiting,
    fetchContainersTerminated,
    fetchContainerRestarts,
    fetchContainerCpuRequests,
    fetchContainerMemoryRequests
} from '../../../../../../redux/actions/monitoring/fetchContainers';

class Containers extends Component {
    componentWillMount() {
        this.props.fetchContainersRunning();
        this.props.fetchContainersWaiting();
        this.props.fetchContainersTerminated();
        this.props.fetchContainerRestarts();
        this.props.fetchContainerCpuRequests();
        this.props.fetchContainerMemoryRequests();
    }

    getContainersRunning = (containersRunning) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Running
                    </div>
                    <div className="card-bodyFETCH_CLUSTER_CPU_USAGE">
                        <h1 className="card-title text-center">{containersRunning}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainersWaiting = (containersWaiting) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Waiting
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{containersWaiting}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainersTerminated = (containersTerminated) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Terminated
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{containersTerminated}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainerRestarts = (containerRestarts) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Container Restarts (last 30 minutes)
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{containerRestarts}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getCPURequests = (cpuRequests) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers CPU Requests
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{cpuRequests}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainerMemoryRequests = (memoryRequests) => {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Total Container Memory Requested
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{memoryRequests} GB</h1>
                    </div>
                </div>
            </div>
        );
    }

    renderContainers = () => {
        const {
            containersRunning,
            containersWaiting,
            containersTerminated,
            containerRestarts,
            containerCpuCores,
            containerMemRequests
        } = this.props;

        return (
            <div className="card parent">
                <div className="card-header">
                    Containers
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.getContainersRunning(containersRunning)}
                        {this.getContainersWaiting(containersWaiting)}
                        {this.getContainersTerminated(containersTerminated)}
                        {this.getContainerRestarts(containerRestarts)}
                        {this.getCPURequests(containerCpuCores)}
                        {this.getContainerMemoryRequests(containerMemRequests)}
                    </div>

                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderContainers()
        );
    }
}

Containers.propTypes = {
    fetchContainersRunning: PropTypes.func.isRequired,
    fetchContainersWaiting: PropTypes.func.isRequired,
    fetchContainerRestarts: PropTypes.func.isRequired,
    fetchContainersTerminated: PropTypes.func.isRequired,
    fetchContainerCpuRequests: PropTypes.func.isRequired,
    fetchContainerMemoryRequests: PropTypes.func.isRequired,
    containersRunning: PropTypes.string,
    containersWaiting: PropTypes.string,
    containerRestarts: PropTypes.string,
    containersTerminated: PropTypes.string,
    containerMemRequests: PropTypes.number,
    containerCpuCores: PropTypes.number,
}

const mapStateToProps = state => ({
    containersRunning: state.containers.containersRunning,
    containersWaiting: state.containers.containersWaiting,
    containerRestarts: state.containers.containerRestarts,
    containersTerminated: state.containers.containersTerminated,
    containerMemRequests: state.containers.containerMemRequests,
    containerCpuCores: state.containers.containerCpuCores
});

export default connect(
    mapStateToProps,
    {
        fetchContainerCpuRequests,
        fetchContainerMemoryRequests,
        fetchContainerRestarts,
        fetchContainersRunning,
        fetchContainersTerminated,
        fetchContainersWaiting
    }
)(Containers);