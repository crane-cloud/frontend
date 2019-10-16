import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchConfigMaps } from '../../../../redux/actions/monitoring/fetchConfigMaps';

class ConfigMaps extends Component {
  componentWillMount() {
    this.props.fetchConfigMaps();
  }

    createTable = () => (
      <div>
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Namespace</th>
              <th scope="col">Labels</th>
              {/* <th scope="col">Age</th> */}
            </tr>
          </thead>
          <tbody>
            {/* { this.state.isLoading ? <Loader /> : } */}
            {
              this.props.configMapsArray.map((element) => (
                <tr key={this.props.configMapsArray.indexOf(element)}>
                  <td> {element.metric.configmap}</td>
                  <td> {element.metric.namespace} </td>
                  <td> HERITAGE:{element.metric.heritage} </td>
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
          <a href="#"> <span className="fa fa-ellipsis-v" aria-hidden="true"></span></a>
        </div>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">Edit YAML</button>
          <button className="dropdown-item" type="button">Scale</button>
          <button className="dropdown-item" type="button">Delete Config Map</button>
        </div>
      </div>
    )

    renderTable = () => (
      <div className="card col-sm-12">
        <div className="card-header text-center">
                    Config Maps
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

ConfigMaps.propTypes = {
  fetchConfigMaps: PropTypes.func.isRequired,
  configMapsArray: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  configMapsArray: state.configMaps.configMapsArray
});

export default connect(mapStateToProps, { fetchConfigMaps })(ConfigMaps);
