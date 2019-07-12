import React, { Component } from "react";
import TopNav from "../../../TopNav";
import SideNav from "../../../sideNav";
import DonutChart from 'react-donut-chart';


class ClusterHealth extends Component {
    constructor() {
        super()
        this.state = {
            clusterCPU: 0,
            clusterMemory: 0,
            clusterDisk: 0,
            clusterPod: 0
        }
    }

    getCpuUsage = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/cpu';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let percentageCPU = ((data.data.result[0].value[1]) * 100);
                this.setState({ clusterCPU: percentageCPU });
            })
            .catch(() => console.log("Cant access " + apiRoute));
        
            return (
            <div className="card">
                <div className="card-header">
                    Cluster CPU Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: this.state.clusterCPU,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - this.state.clusterCPU,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getMemoryUsage = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/memory';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let percentageMemory = ((data.data.result[0].value[1]) * 100);
                this.setState({ clusterMemory: percentageMemory });
            })
            .catch(() => console.log("Cant access " + apiRoute));
        
            return (
            <div className="card">
                <div className="card-header">
                    Cluster Memory Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: this.state.clusterMemory,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - this.state.clusterMemory,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getDiskUsage = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/disk';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let percentageDisk = ((data.data.result[0].value[1]) * 100)
                console.log(percentageDisk);
                this.setState({ clusterDisk: percentageDisk });
            })
            .catch(() => console.log("Cant access " + apiRoute));
        
            return (
            <div className="card">
                <div className="card-header">
                    Cluster Disk Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: this.state.clusterDisk,
                            color: "red"
                        },
                        {
                            label: 'Available',
                            value: 100 - this.state.clusterDisk,
                            color: "#008000"
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    getPodUsage = () => {
        const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/cpu';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let percentagePod = ((data.data.result[0].value[1]) * 100)
                console.log(percentagePod);
                this.setState({ clusterPod: percentagePod });
            })
            .catch(() => console.log("Cant access " + apiRoute));
        
            return (
            <div className="card">
                <div className="card-header">
                    Cluster Pod Usage
                </div>
                <div className="card-body">
                    <DonutChart data={
                        [{
                            label: 'Used',
                            value: this.state.clusterPod,
                            // color: "red"
                            color: ["#66ff33"]
                        },
                        {
                            label: 'Available',
                            value: 100 - this.state.clusterPod,
                            color: ["#66ff33"]
                        }]} width={400} height={300} />
                </div>
            </div>
        )
    }

    renderClusterHealth = () => {
        return (
            <div className="row">
                <div className="column-3">
                    {this.getCpuUsage()}
                </div>
                <div className="column-3">
                    {this.getMemoryUsage()}
                </div>
                <div className="column-3">
                    {this.getDiskUsage()}
                </div>
                <div className="column-3">
                    {this.getPodUsage()}
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

export default ClusterHealth;