import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPersistentVolumes } from '../../../../redux/actions/monitoring/fetchPersistentVolumes';
// import Loader from '../../../loader/loader';


class PersistentVolumes extends Component {


    componentWillMount() {
        this.props.fetchPersistentVolumes();
    }

    createTable = () => {
        
        return (
            <div>
                <table className="table table-striped custom-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Access Modes</th>
                            <th scope="col">Reclaim Policy</th>
                            <th scope="col">Status</th>
                            <th scope="col">Claim</th>
                            <th scope="col">Storage Class</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* { this.state.isLoading ? <Loader /> : } */}
                        {
                            this.props.persistentVolumes.map( element => ( 
                                <tr key={this.props.persistentVolumes.indexOf(element)}>
                                    <td> {element.metric.persistentvolume}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td> {element.metric.storageclass} </td>
                                    <td>-</td>
                                    <td>-</td>
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
                    <button className="dropdown-item" type="button">Delete</button>
                </div>
            </div>
        )
    }

    renderTable = () => {
        return (
            <div className="card col-sm-12">
                <div className="card-header text-center">
                    Persistent Volumes
                    </div>
                <div className="card-body">
                    {this.createTable()}
                </div>
            </div>

        );
    }

    render() {
        return (
            this.renderTable()
        )
    }
}

PersistentVolumes.propTypes = {
    fetchPersistentVolumes: PropTypes.func.isRequired,
    persistentVolumes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    persistentVolumes: state.persistentVolumes.persistentVolumes
});

export default connect(mapStateToProps, { fetchPersistentVolumes })(PersistentVolumes);