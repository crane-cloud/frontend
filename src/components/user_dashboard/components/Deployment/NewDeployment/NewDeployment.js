import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

import "../../../../../assets/css/userdashboard.css";

class NewDeployment extends Component {
    // state = {
    //     advanced: false
    // }

    writeYaml = () => {
        return (
            <form>
                <h5>Write Deployment File</h5>
                <p>Write your deployment on the area below. The configuration will be saved as a YAML file</p>
                <textarea className="rounded-0 writeYAML" rows="10" cols="80"></textarea>
            </form>
        )
    }

    uploadYamlFile = () => {
        return (
            <form>
                <h5>Upload Deployment File</h5>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Click the button below and select a .YAML file from your computer</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                </div>
            </form>
        )
    }

    // formAdvancedOptions = () => {

    // }

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
            </form>
        )
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
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Write YAML</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Upload File</a>
                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Create Deployment</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">{this.writeYaml()}</div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">{this.uploadYamlFile()}</div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">{this.deployUsingForm()}</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.props.closeModal({ visibleNewDeploymentModal: false })}>Cancel</button>
                            <button type="button" className="btn btn-primary">Save Deployment</button>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

export default NewDeployment;
