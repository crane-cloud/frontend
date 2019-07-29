import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { BASE_URL, PROXY_URL } from '../../../../../config';

import "../../../../../assets/css/userdashboard.css";

class NewDeployment extends Component {
    state = {
        // advanced: false
        fileContent: "",
        yamlData: ""
    }

    deployWithYaml = () => {
        return (
            <form onSubmit={this.handleYAMLSubmit}>
                <div className="form-group">
                    <h5>Write Deployment File</h5>
                    <p>Write your deployment on the area below. The configuration will be saved as a YAML file</p>
                    <textarea className="rounded-0 writeYAML" rows="10" cols="100"></textarea>
                </div>
                <h5>Upload Deployment File</h5>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Click the button below and select a .YAML file from your computer</label><br />
                    <input type="file" accept=".yaml, .json" className="form-control-file" onChange={this.captureFile} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => this.props.closeModal({ visibleNewDeploymentModal: false })}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleYAMLSubmit}>Save Deployment</button>
                </div>
            </form>
        )
    }

    deployUsingForm = () => {
        return (
            <form>
                <h5>Fill the form below to create your Deployment</h5>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Deployment name</label>
                    <input required type="text" className="form-control" placeholder="Enter a name for your app name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Container image</label>
                    <input required type="url" className="form-control" placeholder="Enter registry URL to your app's image" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Number of pods</label>
                    <input required type="number" className="form-control" />
                </div>

                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Service</label>
                        </div>
                        <select required className="custom-select" id="inputGroupSelect01">
                            <option selected value="1">None</option>
                            <option value="2">Internal</option>
                            <option value="3">External</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => this.props.closeModal({ visibleNewDeploymentModal: false })}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>Save Deployment</button>
                </div>
            </form>
        )
    }

    captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const yaml = reader.result.replace("data:application/x-yaml;base64,", "");
            this.setState({ fileContent: yaml });
        }
    }

    handleYAMLSubmit = (event) => {
        event.preventDefault();
        const { fileContent } = this.state;
        if (fileContent == "") {
            return;
        } else {
            axios.post(PROXY_URL + BASE_URL + '/deploy/yaml', {
                yaml_file: fileContent,
                namespace: "test"
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleFormSubmit = () => {
        console.log("hey man!");
    }


    render() {
        return (
            <section>
                <Modal
                    visible={this.props.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.props.closeModal({ visibleNewDeploymentModal: false })}
                    width="70%"
                    height="100%" >


                    <div className="modal-content Modal">
                        <div className="modal-header">
                            <h5 className="modal-title">Create a new Deployment</h5>
                            <button type="button" className="close" onClick={() => this.props.closeModal({ visibleNewDeploymentModal: false })} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Write/Upload YAML</a>

                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Create Deployment</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">{this.deployWithYaml()}</div>

                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">{this.deployUsingForm()}</div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

export default NewDeployment;
