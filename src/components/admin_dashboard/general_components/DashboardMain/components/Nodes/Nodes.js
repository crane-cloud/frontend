import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchedNodesTable, fetchTotalNodes, fetchNodesOutOfDisk, fetchNodesUnavailable } from '../../../../redux/actions/monitoring/fetchDeployments';

import TopNav from "../../../TopNav";

class Nodes extends Component {
    
    componentWillMount() {
        this.props.fetchedNodesTable();
        this.props.fetchTotalNodes();
        this.props.fetchNodesUnavailable();
        this.props.fetchNodesOutOfDisk();
    }

    getTotalNodes =(totalNodes)=> {
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center">
                        Total Nodes
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{totalNodes}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getNodesOutOfDisk =(nodesOutofDisk)=> {
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center">
                        Nodes out of disk
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{nodesOutofDisk}</h1>
                    </div>
                </div>
            </div>
        );
    }

    getNodesUnavailable =(nodesUnavailable)=> {
        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header text-center">
                        Nodes Unavailable
                    </div>
                    <div className="card-body">
                        <h1 className="card-title text-center">{nodesUnavailable}</h1>
                    </div>
                </div>
            </div>
        );
    }

    createTable = (array) => {
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
                            array.map(element => (
                                <tr key={array.indexOf(element)}>
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
                    {this.createTable(this.props.nodesArray)}
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
        const { nodesTotal, nodesOutOfDisk, nodesUnavailable } = this.props;
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <TopNav />
                {this.header()}
                <h2 className="text-center">AWS Cluster Nodes</h2>
                <div className="row">
                    {this.getTotalNodes(nodesTotal)}
                    {this.getNodesOutOfDisk(nodesOutOfDisk)}
                    {this.getNodesUnavailable(nodesUnavailable)}
                </div>    
                {this.renderNodesTable()}
            </main>
        )
    }
}

Nodes.propTypes = {
    fetchedNodesTable: PropTypes.func.isRequired, 
    fetchTotalNodes: PropTypes.func.isRequired,
    fetchNodesUnavailable: PropTypes.func.isRequired,
    fetchNodesOutOfDisk: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    nodesArray: state.nodes.nodesArray,
    nodesTotal: state.nodes.nodesTotal,
    nodesOutOfDisk: state.nodes.nodesOutOfDisk,
    nodesUnavailable: state.nodes.nodesUnavailable
});

export default connect(
    mapStateToProps,
    {
        fetchedNodesTable,
        fetchTotalNodes,
        fetchNodesOutOfDisk,
        fetchNodesUnavailable
    })(Nodes);