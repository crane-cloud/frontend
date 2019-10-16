import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDeployments } from '../../../../redux/actions/monitoring/fetchDeployments';


class Deployments extends Component {
  componentWillMount() {
    this.props.fetchDeployments();
  }

    createTable = () => (
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
            {/* { this.state.isLoading ? <Loader /> : } */}
            {
              this.props.deploymentsArray.map((element) => (
                <tr key={this.props.deploymentsArray.indexOf(element)}>
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
    )

    dropDown = () => (
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

    renderDeploymentsTable = () => (
      <div className="card col-sm-12">
        <div className="card-header text-center">
                    Deployments
        </div>
        <div className="card-body">
          {this.createTable()}
        </div>
      </div>
    )

    render() {
      return (
        this.renderDeploymentsTable()
      );
    }
}

Deployments.propTypes = {
  fetchDeployments: PropTypes.func.isRequired,
  deploymentsArray: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  deploymentsArray: state.deployments.deploymentsArray
});

export default connect(mapStateToProps, { fetchDeployments })(Deployments);
