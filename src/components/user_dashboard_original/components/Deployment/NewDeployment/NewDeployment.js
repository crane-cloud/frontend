import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { BASE_URL, PROXY_URL } from '../../../../../config';

import DeployUsingYaml from './yamlDeploy';
import DeployUsingForm from './formDeploy';

import "../../../../../assets/css/userdashboard.css";

class NewDeployment extends Component {
    state = {
        // advanced: false
        fileContent: "",
        yamlData: ""
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
                                <DeployUsingYaml />
                                <DeployUsingForm />
                            </div>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

export default NewDeployment;
