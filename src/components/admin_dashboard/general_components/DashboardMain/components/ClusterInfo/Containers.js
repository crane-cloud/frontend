import React, { Component } from 'react';

class Containers extends Component {
    constructor() {
        super()
        this.state = {
            containersRunning: 0,
            containersWaiting: 0,
            containersTerminated: 0,
            containerRestarts: 0,
            containerCpuCores: 0,
            containerMemRequests: 0
        }
    }

    getContainersRunning =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/containers';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ containersRunning: data.data.result[0].value[1]} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Running
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containersRunning}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainersWaiting =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/containers/waiting';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ containersWaiting: data.data.result[0].value[1]} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Waiting
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containersWaiting}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainersTerminated =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/containers/terminated';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ containersTerminated: data.data.result[0].value[1]} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers Terminated
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containersTerminated}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainerRestarts =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/containers/restarts';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ containerRestarts: data.data.result[0].value[1]} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Container Restarts (last 30 minutes)
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containerRestarts}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getCPURequests =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/containers/cpu';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let cpuRequests = Math.round(data.data.result[0].value[1])
            this.setState({ containerMemoryRequests: cpuRequests} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Containers CPU Requests
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containerMemoryRequests}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getContainerMemoryRequests =()=> {
        const apiRoute = 'http://54.84.186.47:31765/monitor/coontainers/memory';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let memUsage = ((data.data.result[0].value[1]) / 1000000000)
            memUsage = this.roundToTwo(memUsage);
            this.setState({ containerMemRequests: memUsage} );
        })
        .catch(() => console.log("Cant access " + apiRoute));

        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-center success">
                        Total Container Memory Requested
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{this.state.containerMemRequests} GB</h1>
                    </div>
                </div>
            </div>
        );
    }

    roundToTwo = (num) => {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    renderContainers() {
        return (
            <div className="card parent">
                <div className="card-header">
                    Containers
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.getContainersRunning()}
                        {this.getContainersWaiting()}
                        {this.getContainersTerminated()}
                        {this.getContainerRestarts()}
                        {this.getCPURequests()}
                        {this.getContainerMemoryRequests()}
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

export default Containers;