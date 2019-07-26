import React , { Component } from "react";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import library css

import Header from "../../../MainSection/components/header/header";
import './organizationsMain.css';

export default class OrganizationsMain extends Component{

    orgID  = this.props.orgID;

    // /organizations/orgID/namespaces/
    // eg /organizations/340/namespaces/
    organizationNameSpaces = {
        orgName : "org name",
        namespaces : [
            {
                name : "TrainCo",
                namespaceID : 46748,
                deployments : [
                    {
                        name : "Kampala Trians",
                        deploymentID : 56473,
                        status : "okey",
                        billing : 354676
                    },
                    {
                        name : "Gulu Buses",
                        deploymentID : 567493,
                        status : "error",
                        billing : 35566
                    }
                ]
            },
            {
                name : "Farms Co",
                namespaceID : 46748,
                deployments : [
                    {
                        name : "Tororo Maize",
                        deploymentID : 67484,
                        status : "error",
                        billing : 578373
                    },
                    {
                        name : "Jinja Beans",
                        deploymentID : 67483,
                        status : "okey",
                        billing : 675843
                    }
                ]
            }
        ]
    };

    state = {
        organizationNameSpaces : []
    }

    componentDidMount(){
        this.setState({
            organizationNameSpaces : this.organizationNameSpaces.namespaces
        });
    }
    
    render(){
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Header />
                <h2 className="text-center mx-3"> { this.organizationNameSpaces.orgName }
                    <span className="dropdown manageOrgMenu">
                            <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="fa fa-ellipsis-v"></span>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                {/* <button className="dropdown-item" type="button" onClick={() => this.openModal({ visibleNodesModal: true })} >Nodes <span className="badge badge-info"> 3 </span> </button> */}
                                {/* <button className="dropdown-item" type="button" onClick={() => this.openModal({ visiblePersistentVolumesModal: true })} >Persistent Volumes <span className="badge badge-info"> 0 </span> </button> */}
                                <button className="dropdown-item" type="button">Rename Organization</button>
                                <button className="dropdown-item" type="button"  onClick={ this.deleteOrg }>Delete Organization</button>
                            </div>
                        </span>
                </h2>
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
                                    <h4> { `namespace: ${namespace.name}` } </h4>

                                    <table className="table table-borderless text-left">
                                        <thead>
                                            <th>Deployment</th> 
                                            <th>Status</th>
                                            <th>Billing  (ugx { totalBill })</th>
                                        </thead>
                                        <tbody>
                                            {
                                                namespace.deployments.map((deployment) => {
                                                    return (
                                                        <tr>
                                                            <td> <Link to={`/deployments/${deployment.deploymentID}`}> { deployment.name } </Link></td>
                                                            <td><span className={ `badge badge-${ deployment.status === 'okey' ? 'success' : 'danger' } aLittleMargin` }>{ deployment.status }</span></td>
                                                            <td> UGX { deployment.billing } </td> 
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
                onClick: () => {}
              }
            ]
          });
    }
}
