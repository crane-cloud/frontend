import React, { Component } from 'react';

class Ingresses extends Component {

    ingressesArray = [
        {
            ingressID: 346,
            name: "cm-acme-http-solver-b28fg",
            endpoints: "-",
            age: "9 days"
        },
        {
            ingressID: 347,
            name: "cm-acme-http-solver-85lbb",
            endpoints: "-",
            age: "9 days"
        },
        {
            ingressID: 348,
            name: "kuardz",
            endpoints: "-",
            age: "8 months"
        },
        {
            ingressID: 349,
            name: "httpbin",
            endpoints: "-",
            age: "8 months"
        }
    ]

    createTable = () => {
        return (<div>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Endpoints</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.ingressesArray.map((element) => {
                            return (
                                <tr key={this.ingressesArray.indexOf(element)}>
                                    <td> {element.name}</td>
                                    <td> {element.endpoints} </td>
                                    <td> {element.age} </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }

    renderIngressesTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Ingresses
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }
    
    

    render() {
        return (
            this.renderIngressesTable()
        )
    }
}

export default Ingresses;