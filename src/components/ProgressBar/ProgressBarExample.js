import React, { Component } from 'react';
import ProgressBar from './';

export default class ProgressBarExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 79
    };
  }

  render() {
    return (
      <div>
        <ProgressBar percentage={this.state.percentage} />
      </div>
    );
  }
}
