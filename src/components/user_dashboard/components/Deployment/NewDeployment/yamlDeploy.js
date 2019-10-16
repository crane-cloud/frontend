import React, { Component } from 'react';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';
import { BASE_URL, PROXY_URL } from '../../../../../config';

import 'react-notification-alert/dist/animate.css';
import '../../../../../assets/css/userdashboard.css';

class DeployUsingYaml extends Component {
  state = {
    fileContent: '',
    yamlData: '',
    namespace: ''
  }

  optionsSuccess = {
    place: 'tc',
    message: 'Your Deployment was successful!',
    type: 'success',
    icon: 'fa fa-smile-o',
    autoDismiss: 3,
    closeButton: false
  }

  optionsFail = {
    place: 'tc',
    message: 'Failed! - Deployment already exists!',
    type: 'danger',
    icon: 'fa fa-frown-o',
    autoDismiss: 3,
    closeButton: false
  }

  render() {
    return (
      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <div>
          <NotificationAlert ref="notify" />
        </div>
        {this.deployWithYaml()}
      </div>
    );
  }

  deployWithYaml = () => (
    <form onSubmit={this.handleYAMLSubmit}>
      <div className="form-group">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Select a namespace</label>
          </div>
          <select required className="custom-select" id="inputGroupSelect01" onChange={this.handleOnChange} name="namespace">
            <option value="">--none--</option>
            <option value="deployments">deployments</option>
            <option value="testers">testers</option>
            <option value="trial">trial</option>
            <option value="monitoring">monitoring</option>
            <option value="ngin">ngin</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <h5>Write Deployment File</h5>
        <p>Write your deployment on the area below. The configuration will be saved as a YAML file</p>
        <textarea
          name="yamlData"
          className="rounded-0 writeYAML"
          rows="16"
          cols="80"
          value={this.state.yamlData}
          onChange={this.handleOnChange}
        />
      </div>
      <h5>Upload Deployment File</h5>
      <div className="form-group">
        <label htmlFor="exampleFormControlFile1">Click the button below and select a .YAML file from your computer</label><br />
        <input type="file" accept=".yaml, .json" className="form-control-file" onChange={this.captureFile} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => this.props.closeModal({ visibleNewDeploymentModal: false })}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={this.handleYAMLSubmit}>Deploy</button>
      </div>
    </form>
  )

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    const content = new FileReader();
    reader.readAsDataURL(file);
    content.readAsText(file);
    reader.onloadend = () => {
      const yaml = reader.result.replace('data:application/x-yaml;base64,', '');
      this.setState({ fileContent: yaml });
    };
    content.onloadend = () => {
      this.setState({ yamlData: content.result });
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleYAMLSubmit = (event) => {
    event.preventDefault();
    const { fileContent, namespace } = this.state;
    if (fileContent === '' || namespace === '') {
      return;
    }
    axios.post(`${PROXY_URL + BASE_URL}/deploy/yaml`, {
      yaml_file: fileContent,
      namespace
    })
      .then((response) => {
        response.data === 'Error Already exits' ? this.refs.notify.notificationAlert(this.optionsFail) : this.refs.notify.notificationAlert(this.optionsSuccess);
        this.props.closeModal({ visibleNewDeploymentModal: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default DeployUsingYaml;
