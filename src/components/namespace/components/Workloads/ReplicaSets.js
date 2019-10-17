import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchReplicaSets from '../../../../redux/actions/monitoring/fetchReplicaSets';

class ReplicaSets extends Component {
  componentWillMount() {
    this.props.fetchReplicaSets();
  }

  createTable = () => (
    <div>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Labels</th>
            <th scope="col">Pods</th>
            <th scope="col">Images</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.replicaSetsArray.map((element) => {
              const { metric } = element;
              return (
                <tr key={this.props.replicaSetsArray.indexOf(element)}>
                  <td>{metric.replicaset}</td>
                  <td>APP:{metric.label_app}, HASH:{metric.label_pod_template_hash}</td>
                  <td>{element.value[1]}</td>
                  <td>-</td>
                  <td>-</td>
                  <td> {this.dropDown()} </td>
                </tr>
              );
            })
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
        <button className="dropdown-item" type="button">Delete</button>
      </div>
    </div>
  )

  renderRepSetsTable = () => (
    <div className="card col-sm-12">
      <div className="card-header text-center">
        Replica Sets
      </div>
      <div className="card-body">
        {this.createTable()}
      </div>
    </div>

  )

  render() {
    return (
      this.renderRepSetsTable()
    );
  }
}

ReplicaSets.propTypes = {
  fetchReplicaSets: PropTypes.func.isRequired,
  replicaSetsArray: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  replicaSetsArray: state.replicaSets.replicaSetsArray
});

export default connect(mapStateToProps, { fetchReplicaSets })(ReplicaSets);
