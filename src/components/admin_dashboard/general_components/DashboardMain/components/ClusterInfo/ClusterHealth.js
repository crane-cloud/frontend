import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchClusterCpuUsage,
    fetchClusterMemoryUsage,
    fetchClusterDiskUsage,
    fetchClusterPods
} from '../../../../../../redux/actions/monitoring/fetchClusterInfo';

import TopNav from "../../../TopNav";
import SideNav from "../../../sideNav";
import DonutChart from 'react-donut-chart';


class ClusterHealth extends Component {

    componentWillMount() {
        this.props.fetchClusterCpuUsage();
        this.props.fetchClusterMemoryUsage();
        this.props.fetchClusterDiskUsage();
        this.props.fetchClusterPods();
    }

    getCpuUsage = (cpuUsage) => {
        return (
            <div className="card">
                <div className="card-header">
                    Cluster CPU Usage
                </div>FETCH_NODES_TABLE
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: cpuUsage,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - cpuUsage,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getMemoryUsage = (memoryUsage) => {
        return (
            <div className="card">
                <div className="card-header">
                    Cluster Memory Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: memoryUsage,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - memoryUsage,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getDiskUsage = (diskUsage) => {
        return (
            <div className="card">
                <div className="card-header">
                    Cluster Disk Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: diskUsage,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - diskUsage,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getPodUsage = (pods) => {
        return (
            <div className="card">
                <div className="card-header">
                    Cluster Pod Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: pods,
                            // color: "red"
                            color: ["#66ff33"]
                        },
                        {
                            label: 'Available',
                            value: 100 - pods,
                            color: ["#66ff33"]
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    renderClusterHealth = () => {
        const {
            clusterCPU,
            clusterMemory,
            clusterDisk,
            clusterPod
        } = this.props;

        return (
            <div className="card parent">
                <div className="card-header">
                    Cluster Health
                </div>

                <div className="row">
                    <div className="col-6">
                        {this.getCpuUsage(clusterCPU)}
                    </div>
                    <div className="col-6">
                        {this.getMemoryUsage(clusterMemory)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {this.getDiskUsage(clusterDisk)}
                    </div>
                    <div className="col-6">
                        {this.getPodUsage(clusterPod)}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <TopNav />
                <div className="container-fluid">
                    <SideNav />
                    {this.renderClusterHealth()}
                </div>
            </div>
        );
    }
}



ClusterHealth.propTypes = {
    fetchClusterCpuUsage: PropTypes.func.isRequired,
    fetchClusterMemoryUsage: PropTypes.func.isRequired,
    fetchClusterDiskUsage: PropTypes.func.isRequired,
    fetchClusterPods: PropTypes.func.isRequired,
    clusterCPU: PropTypes.number,
    clusterMemory: PropTypes.number,
    clusterDisk: PropTypes.number,
    clusterPod: PropTypes.number
}

const mapStateToProps = state => ({
    clusterCPU: state.clusterInfo.clusterCPU,
    clusterMemory: state.clusterInfo.clusterMemory,
    clusterDisk: state.clusterInfo.clusterDisk,
    clusterPod: state.clusterInfo.clusterPod
});

export default connect(
    mapStateToProps,
    {
        fetchClusterCpuUsage,
        fetchClusterMemoryUsage,
        fetchClusterDiskUsage,
        fetchClusterPods
    }
)(ClusterHealth);