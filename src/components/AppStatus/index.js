import React, { Component } from "react";
import "./AppStatus.css";

class AppStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { statusClassName: "StatusSignal StatusOther" };
    this.setClassName = this.setClassName.bind(this);
  }

  setClassName() {
    const currentClassName = this.props.appStatus;
    if (currentClassName === "running") {
      this.setState({ statusClassName: "StatusSignal StatusRunning" });
    } else if (currentClassName === "failed") {
      this.setState({ statusClassName: "StatusSignal StatusFailed" });
    } else {
      // let the default class Name remain
    }
    return currentClassName;
  }
  componentDidMount() {
    this.setClassName();
  }
  render() {
    return (
      <div>
        <div className="StatusWrapper">
          <div className={this.state.statusClassName} />
        </div>
      </div>
    );
  }
}

export default AppStatus;
