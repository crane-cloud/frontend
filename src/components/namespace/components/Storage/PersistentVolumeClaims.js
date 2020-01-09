import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchpvClaims } from '../../../../redux/actions/monitoring/fetchPVClaims';


class PersistentVolumeClaims extends Component {
  componentWillMount() {
    this.props.fetchpvClaims();
  }

    createTable = () => (
      <div>
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Namespace</th>
              <th scope="col">Status</th>
              <th scope="col">Volume</th>
              <th scope="col">Capacity</th>
              <th scope="col">Access Modes</th>
              <th scope="col">Storage Class</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {/* { this.state.isLoading ? <Loader /> : } */}
            {
              this.props.pvClaims.map((element) => (
                <tr key={this.props.pvClaims.indexOf(element)}>
                  <td>{element.metric.persistentvolumeclaim}</td>
                  <td>{element.metric.namespace}</td>
                  <td>-</td>
                  <td>{element.metric.volumename}</td>
                  <td>-</td>
                  <td>-</td>
                  <td> {element.metric.storageclass} </td>
                  <td>-</td>
                  <td> {this.dropDown()} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )

    dropDown = () => (
      <div className="dropdown">
        <div data-toggle="dropdown">
          <a href="/home"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
        </div>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">Edit YAML</button>
          <button className="dropdown-item" type="button">Scale</button>
          <button className="dropdown-item" type="button">Delete</button>
        </div>
      </div>
    )

    renderTable = () => (
      <div className="card col-sm-12">
        <div className="card-header text-center">
                    Persistent Volume Claims
        </div>
        <div className="card-body">
          {this.createTable()}
        </div>
      </div>

    )

    render() {
      return (
        this.renderTable()
      );
    }
}

PersistentVolumeClaims.propTypes = {
  fetchpvClaims: PropTypes.func.isRequired,
  pvClaims: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  pvClaims: state.pvClaims.pvClaims
});

export default connect(mapStateToProps, { fetchpvClaims })(PersistentVolumeClaims);
