import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

import "../../../../../assets/css/userdashboard.css";

class NewOrganization extends Component {
    state = {
        // advanced: false
        fileContent: ""
    }

    createOrganization = () => {
        return (
            <form>
                <h5>Fill the form below to create a new Organization</h5>
                <div className="form-group">
                    <label>Name</label>
                    <input required type="text" className="form-control" placeholder="Enter a name for the organization" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input required type="text" className="form-control" placeholder="Enter a name for the organization" />
                </div>
            </form>
        );
    }

    render() {
        return (
            <section>
                <Modal
                    visible={this.props.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.props.closeModal({ newOrganizationModal: false })}
                    width="70%"
                    height="100%" >


                    <div className="modal-content Modal">
                        <div className="modal-header">
                            <h5 className="modal-title">Create a new Organization</h5>
                            <button type="button" className="close" onClick={() => this.props.closeModal({ newOrganizationModal: false })} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.createOrganization()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.props.closeModal({ newOrganizationModal: false })}>Cancel</button>
                            <button type="button" className="btn btn-primary">Save Deployment</button>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

export default NewOrganization;
