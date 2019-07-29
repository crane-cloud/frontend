import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

import "../../../../../assets/css/userdashboard.css";

class NewOrganization extends Component {

    createOrganization = () => {
        return (
            <form>
                <h5>Fill the form below to create a new Organization</h5>
                <div className="form-group">
                    <label>Name</label>
                    <input required type="text" className="form-control" placeholder="Enter a name for the organization" />
                </div>
                <div className="form-group">
                    <label>Create Namespace</label>
                    <input required type="text" className="form-control" placeholder="Add a new namespace" />
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Or select existing namespace</label>
                        </div>
                        <select required className="custom-select" id="inputGroupSelect01">
                            <option selected value="1">None</option>
                            <option value="2">Namespace1</option>
                            <option value="3">Namespace2</option>
                        </select>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        const { closeModal } = this.props;
        return (
            <section>
                <Modal
                    visible={this.props.visible}
                    effect="fadeInUp"
                    onClickAway={() => closeModal({ newOrganizationModal: false })}
                    width="70%"
                    height="100%" >


                    <div className="modal-content Modal">
                        <div className="modal-header">
                            <h5 className="modal-title">Create a new Organization</h5>
                            <button type="button" className="close" onClick={() => closeModal({ newOrganizationModal: false })} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.createOrganization()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => closeModal({ newOrganizationModal: false })}>Cancel</button>
                            <button type="button" className="btn btn-primary">Create Organization</button>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

export default NewOrganization;
