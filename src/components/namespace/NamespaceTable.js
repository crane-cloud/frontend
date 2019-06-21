
import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import components from './components/components';

class NamespaceTable extends Component {

    constructor() {
        super();
        this.state = { expandedRows: [] };
    }

    handleExpand = (component) => {
        let newExpandedRows = [...this.state.expandedRows];
        let idxFound = newExpandedRows.findIndex((id) => {
            return id === component.id;
        });

        if (idxFound > -1) {
            newExpandedRows.splice(idxFound, 1);
        }
        else {
            newExpandedRows.push(component.id);
        }

        this.setState({ expandedRows: [...newExpandedRows] });
    }

    isExpanded = (component) => {
        const idx = this.state.expandedRows.find(
            (id) => {
                return id === component.id;
            }
        );

        return idx > -1;
    }

    expandAll = (components) => {
        if (this.state.expandedRows.length === components.length) {

            let newExpandedRows = [];
            this.setState({ expandedRows: [...newExpandedRows] });
        }
        else {
            let newExpandedRows = components.map(
                component => component.id
            );
            this.setState({ expandedRows: [...newExpandedRows] });
        }
    }

    getRows = (component) => {

        let rows = [];

        const firstRow = (
            <tr onClick={() => this.handleExpand(component)}>
                <td >
                    <button>
                        {this.isExpanded(component) ? "-" : "+"}
                    </button>
                </td>
                <td>{component.component}</td>
            </tr>
        )

        rows.push(firstRow);

        if (this.isExpanded(component)) {
            const detailRow = (
                <tr className="component-details">
                    <td colSpan="4" className="component-details">
                        {this.getStats(component)}
                    </td>
                </tr>
            );
            rows.push(detailRow);
        }

        return rows;
    }

    getStats = (component) => {
        return (
            <div>
                {
                    Object.keys(component.subcomponent).map((key) => {
                        return (
                            <div  className="attribute">
                            <div className="attribute-name"><Link to={`namespace/${component.component}/${key}/58`}>{component.subcomponent[key]} </Link></div>
                            <br />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    getcomponentTable = (components) => {

        const componentRows = components.map((component) => {
            return this.getRows(component);
        });

        return (
            <table className="my-table">
                <tbody>
                    <tr>
                        <th onClick={() => this.expandAll(components)}>
                            <button >
                                {components.length === this.state.expandedRows.length ? "-" : "+"}
                            </button>
                        </th>
                        <th>Namespace Components</th>
                    </tr>
                    {componentRows}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                {this.getcomponentTable(components)}
            </div>
        );
    }
}

export default NamespaceTable;