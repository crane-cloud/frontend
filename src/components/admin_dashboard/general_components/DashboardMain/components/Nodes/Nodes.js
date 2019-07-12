import React, { Component } from 'react';
import TopNav from "../../../TopNav";

class Nodes extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            nodesArray: []
        }
    }

    async componentDidMount() {
        const apiRoute = 'http://54.84.186.47:31765/monitor/nodes/info';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({ nodesArray: data.data.result, loading: false })
            })
            .catch(() => console.log("Can't access " + apiRoute));
    }

    createTable = () => {
        return (
            <div>
                <table className="table table-striped custom-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">OS Image</th>
                            <th scope="col">Instance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.nodesArray.map(element => (
                                <tr key={this.state.nodesArray.indexOf(element)}>
                                    <td> {element.metric.node}</td>
                                    <td> {element.metric.os_image} </td>
                                    <td> {element.metric.instance} </td>
                                    <td> {this.dropDown()} </td>
                                </tr>
                            ))
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
                    <button className="dropdown-item" type="button">Delete Node</button>
                </div>
            </div>
        )
    }

    renderNodesTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Nodes
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    header = () => {
        return (
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button className="btn btn-sm btn-outline-secondary"><span className="fa fa-plus"></span> New Node</button>
                        </div>
                    </div>
                </div>
        )
    }

    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <TopNav />
                { this.header() }
                <h2 className="text-center">AWS Cluster Nodes</h2>
                {this.renderNodesTable()}
            </main>
        )
    }
}

export default Nodes;