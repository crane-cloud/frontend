import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Organizations extends Component {

    organizationsArray = [
        {
            organizationId: "1",
            name: "OrganizationX",
            bill: "501,89"
        },
        {
            organizationId: "2",
            name: "OrganizationY",
            bill: "157,420"
        },
        {
            organizationId: "3",
            name: "OrganizationZ",
            bill: "7,002,189"
        }
    ]

    createTable = () => {
        return (<div>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Current Bill (Ugx)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.organizationsArray.map((element) => {
                            return (
                                <tr key={this.organizationsArray.indexOf(element)}>
                                    <td> {element.id}</td>
                                    <td> {element.name}</td>
                                    <td> {element.bill} </td>
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
                    <button className="dropdown-item" type="button"><Link to="/organization-resources">Resources</Link></button>
                    <button className="dropdown-item" type="button">Delete</button>
                </div>
            </div>
        )
    }

    renderOrganizationsTable = () => {
        return (
            <div className="card col-sm-12">
                {/* <div className="card-header text-center">
                    Organizations
                    </div> */}
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }



    render() {
        return (
            this.renderOrganizationsTable()
        )
    }
}

export default Organizations;