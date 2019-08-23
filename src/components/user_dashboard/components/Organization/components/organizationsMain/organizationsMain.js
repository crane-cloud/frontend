import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import library css
import Modal from 'react-awesome-modal';


import Header from "../../../MainSection/components/header/header";
import NamespaceModal from './components/namespaceModal';
import './organizationsMain.css';

export default class OrganizationsMain extends Component {

    orgID = this.props.orgID;

    // /organizations/orgID/namespaces/
    // eg /organizations/340/namespaces/
    organizationNameSpaces = {
        orgName: "org name",
        namespaces: [
            {
                name: "TrainCo",
                namespaceID: 46748,
                deployments: [
                    {
                        name: "Kampala Trians",
                        deploymentID: 56473,
                        status: "okey",
                        billing: 354676
                    },
                    {
                        name: "Gulu Buses",
                        deploymentID: 567493,
                        status: "error",
                        billing: 35566
                    }
                ]
            },
            {
                name: "Farms Co",
                namespaceID: 46749,
                deployments: [
                    {
                        name: "Tororo Maize",
                        deploymentID: 67484,
                        status: "error",
                        billing: 578373
                    },
                    {
                        name: "Jinja Beans",
                        deploymentID: 67483,
                        status: "okey",
                        billing: 675843
                    }
                ]
            }
        ]
    };

    state = {
        organizationNameSpaces: [],
        orgModalVisible: false,
        renameValue: ''
    }

    componentDidMount() {
        this.setState({
            organizationNameSpaces: this.organizationNameSpaces.namespaces
        });
    }

    deleteOrg = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Delete Org?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        /* hit delete end point */
                        // delete /organizations/orgID  available via this.orgID
                        console.log(this.orgID);
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Header />

                <h2 className="text-center mx-3"> {this.organizationNameSpaces.orgName}
                    <span className="dropdown manageOrgMenu">
                        <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="fa fa-ellipsis-v"></span>
                        </span>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" onClick={this.openModal}>Rename Organization</button>
                            <button className="dropdown-item" type="button" onClick={this.deleteOrg}>Delete Organization</button>
                        </div>
                    </span>
                </h2>
                {this.modalSpan()}

                {/* Button trigger modal */}
                <button type="button" class="btn btn-primary new-namespace" data-toggle="modal" data-target="#exampleModalScrollable">
                    <span className="fa fa-plus"></span>  New Namespace</button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Create Namespace</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div className="form-group">
                                    <label>Create Namespace</label>
                                    <input required type="text" className="form-control" placeholder="Add a new namespace" />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.organizationNameSpaces.map((namespace) => {
                            let totalBill = 0;
                            namespace.deployments.map((dep) => {
                                totalBill = totalBill + dep.billing;
                            });

                            return (
                                <div className="col-6 mb-5">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4> {`namespace: ${namespace.name}`} <NamespaceModal namespaceID={namespace.namespaceID} /> </h4>

                                            <table className="table table-borderless text-left">
                                                <thead>
                                                    <th>Deployment</th>
                                                    <th>Status</th>
                                                    <th>Billing  (ugx {totalBill})</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        namespace.deployments.map((deployment) => {
                                                            return (
                                                                <tr>
                                                                    <td> <Link to={`/deployments/${deployment.deploymentID}`}> {deployment.name} </Link></td>
                                                                    <td><span className={`badge badge-${deployment.status === 'okey' ? 'success' : 'danger'} aLittleMargin`}>{deployment.status}</span></td>
                                                                    <td> UGX {deployment.billing} </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </main>
        );
    }

    openModal = () => {
        this.setState({
            orgModalVisible: true
        });
    }

    closeModal = () => {
        this.setState({
            orgModalVisible: false
        });
    }

    modalSpan = () => {
        return (
            <span className='text-center renameSpanModal'>
                <Modal visible={this.state.orgModalVisible} width="40%" height="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div class='modalContainer'>
                        <h3>Rename Organization</h3>
                        <form>
                            <input type="text" class="form-control" placeholder="Rename organization" onChange={this.handleChange} />
                        </form>
                        <div class='buttons'>
                            <input type='button' className="modalBtn btn btn-outline-info" onClick={() => this.closeModal()} value='cancel' />
                            <input type='button' className="modalBtn btn btn-outline-info" onClick={this.handleRename} value='Rename ORG' />
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }

    handleChange = (event) => {
        this.setState({ renameValue: event.target.value });
    }

    handleRename = () => {
        /* hit rename url */
        // /organizations/orgID/rename/new-name
        // eg /organizations/46739/rename/nile breweries
        // org id available via this.orgID
        alert(`new name is: ${this.state.renameValue}`)
        this.setState({ orgModalVisible: false });
    }


}
