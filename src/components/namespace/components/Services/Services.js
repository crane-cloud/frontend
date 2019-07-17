import React, { Component } from 'react';

class Services extends Component {

    servicesArray = [
        {
            serviceID: 346,
            name: "cm-acme-http-solver-b28fg",
            label: "certmanager.k8s.io/acme-http-domain: 1260062559 certmanager.k8s.io/acme-http-token: 699731322 certmanager.k8s.io",
            clusterIP: "10.100.7.214",
            endpointsInternal: "cm-acme-http-solver-b28fg:8089 TCP cm-acme-http-solver-b28fg:30920 TCP",
            endpointsExternal: "-",
            age: "9 days"
        },
        {
            serviceID: 347,
            name: "trial-prometheus-node-exporter",
            label: "app: prometheus-node-exporter chart: prometheus-node-exporter-1.5.0 heritage: Tiller release: trial",
            clusterIP: "10.100.3.83",
            endpointsInternal: "trial-prometheus-node-exporter:9100 TCP trial-prometheus-node-exporter:0 TCP",
            endpointsExternal: "-",
            age: "10 days"
        },
        {
            serviceID: 345,
            name: "kuard",
            label: "app: kuard",
            clusterIP: "10.100.30.184",
            endpointsInternal: "kuard:80 TCP kuard:0 TCP",
            endpointsExternal: "-",
            age: "8 months"
        }
    ]

    createTable = () => {
        return (<div>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Labels</th>
                        <th scope="col">Pods</th>
                        <th scope="col">Age</th>
                        <th scope="col">Images</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.servicesArray.map((element) => {
                            return (
                                <tr key={this.servicesArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.label} </td>
                                    <td> {element.clusterIP} </td>
                                    <td> {element.endpointsInternal} </td>
                                    <td> {element.endpointsExternal} </td>
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
                    <button className="dropdown-item" type="button">Delete Service</button>
                </div>
            </div>
        )
    }

    renderServicesTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Services
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }
    
    

    render() {
        return (
            this.renderServicesTable()
        )
    }
}

export default Services;