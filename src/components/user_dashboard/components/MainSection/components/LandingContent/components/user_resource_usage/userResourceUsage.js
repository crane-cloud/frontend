import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import './userResource.css';

export default class UserResourceUsage extends Component {
    totalBill = 2336720;

    graphLabels = ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    graphDataValues = [10, 20, 60, 80, 5, 2, 70];

    state = {
      totalBill: 0,
      graphLabels: [],
      graphDataValues: []
    }

    componentDidMount() {
      this.setState({
        totalBill: this.totalBill,
        graphLabels: this.graphLabels,
        graphDataValues: this.graphDataValues
      });
    }

    render() {
      const data = {
        labels: this.state.graphLabels,
        datasets: [{
          label: 'Resource Usage',
          backgroundColor: 'rgb(30,144,255)',
          borderColor: 'rgb(30,144,255)',
          data: this.state.graphDataValues,
        }]
      };


      return (
        <div className="row user-resource">
          <div className="col-9 text-center my-5 mx-auto">
            <h5 className="mb-5">Total Bill : UGX {this.state.totalBill}</h5>
            <Line data={data} />
          </div>
        </div>
      );
    }
}
