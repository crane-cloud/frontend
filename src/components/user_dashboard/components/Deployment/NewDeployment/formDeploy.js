import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL, PROXY_URL } from '../../../../../config';

import "../../../../../assets/css/userdashboard.css";

class DeployUsingForm extends Component {
    state = {
        // advanced: false
        fileContent: "",
        yamlData: ""
    }

    render() {
        return (
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                {this.deployUsingForm()}
            </div>
        );
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
                    <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>Deploy</button>
                </div>
            </form>
        )
    }

    captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        const content = new FileReader();
        reader.readAsDataURL(file);
        content.readAsText(file);
        reader.onloadend = () => {
            const yaml = reader.result.replace("data:application/x-yaml;base64,", "");
            this.setState({ fileContent: yaml });
        }
        content.onloadend = () => {
            this.setState({ yamlData: content.result });
        }
    }

    // TODO
    // handleOnChange = (event) => {
    // }   
    
    handleFormSubmit = () => {
        console.log("hey man!");
    }
}

export default DeployUsingForm;