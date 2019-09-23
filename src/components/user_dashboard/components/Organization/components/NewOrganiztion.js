import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BASE_URL, PROXY_URL } from '../../../../../config';

import "../../../../../assets/css/userdashboard.css";

class NewOrganization extends Component {
    state = {
        orgName: ''
    }

    handleChange = (event) => {
        const { target } = event;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            org_name: this.state.orgName,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token
            }
        };
        axios.post(PROXY_URL + BASE_URL + '/create/organisation', data, config);
    }

    createOrganization = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        autoFocus
                        required
                        type="text"
                        name="orgName"
                        value={this.state.orgName}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter a name for the organization"
                    />
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
                    width="50%"
                    height="60%" >


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
                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Create Organization</button>
                        </div>
                    </div>

                </Modal>
            </section>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.accessToken
    }
}

export default withRouter(connect(mapStateToProps)(NewOrganization));

