import React, { Component } from 'react';
import TopNav from "./general_components/TopNav";
import "../../assets/css/table.css";

class NamespacesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namespaces: [
                { name: "Namespace1", status: "Active", age: "4 hours, 23 minutes" },
                { name: "Namespace2", status: "Active", age: "5 hours, 54 minutes" },
                { name: "Namespace3", status: "Active", age: "21 hours, 11 minutes" },
                { name: "Namespace4", status: "Active", age: "1 day, 3 hours" }
            ]
        }
    }


    renderTableHeader() {
        let header = Object.keys(this.state.namespaces[0])
        return header.map((key, index) => {
            return <th key={index} onClick={() => this.sortBy(key)}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.namespaces.map((namespace, index) => {
            const { name, status, age } = namespace
            return (
                <tr key={name} onClick={this.viewDetails}>
                    <td>{name}</td>
                    <td>{status}</td>
                    <td className="ageData">{age}</td>
                </tr>
            );
        });
    }

    viewDetails = (data) => {
        this.props.history.push({
            pathname: '/namespace-details'
        });
    }

    compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy = (key) => {
        let arrayCopy = [...this.state.namespaces];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ namespaces: arrayCopy });
    }

    render() {
        return (
            <div>
                <TopNav />
                <div className="table">
                <h3>Namespaces</h3>
                <table id='namespaces'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default NamespacesTable;
