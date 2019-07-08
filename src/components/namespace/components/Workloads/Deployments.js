import React, { Component } from 'react';

class Deployments extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            deploymentsArray: []
        }
    }

    async componentDidMount() {
        const apiRoute = 'http://54.84.186.47:31765/monitor/deployment/replicas/info';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + apiRoute)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log(data.data.result)
                this.setState({ deploymentsArray: data.data.result, loading: false })
            })
            .catch(() => console.log("Cant access " + apiRoute));
    }

    createTable = () => {
        return (
            <div>
                <table className="table table-striped custom-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Node</th>
                            <th scope="col">Namespace</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.deploymentsArray.map( element => ( 
                                <tr key={this.state.deploymentsArray.indexOf(element)}>
                                    <td> {element.metric.deployment}</td>
                                    <td> {element.metric.kubernetes_node} </td>
                                    <td> {element.metric.namespace} </td>
                                    <td> {element.value[1]} </td>
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
                    <button className="dropdown-item" type="button">Edit YAML</button>
                    <button className="dropdown-item" type="button">Scale</button>
                    <button className="dropdown-item" type="button">Delete Deployment</button>
                </div>
            </div>
        )
    }

    renderDeploymentsTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Deployments
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    render() {
        return (
            this.renderDeploymentsTable()
        )
    }
}

export default Deployments;