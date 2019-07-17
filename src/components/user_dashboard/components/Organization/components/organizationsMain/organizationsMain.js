import React , { Component } from "react";

export default class OrganizationsMain extends Component{

    orgID  = this.props.orgID;

    // /organizations/orgID/namespaces/
    // eg /organizations/340/namespaces/
    organizationNameSpaces = [
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
    ];

    state = {
        organizationNameSpaces : []
    }

    componentDidMount(){
        this.setState({
            organizationNameSpaces : this.organizationNameSpaces
        });
    }
    
    render(){
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
                <h2 class="text-center"> Organization Name </h2>
                <div class="row">
                    

                {
                    this.state.organizationNameSpaces.map((namespace) => {
                        return (
                            <div class="col-6 mb-5">
                                <div class="card">
                                    <div class="card-body text-center">
                                    <h4> { namespace.name } </h4>

                                    <table class="table table-borderless text-left">
                                        <thead>
                                            <th>Deployment</th> 
                                            <th>Status</th>
                                            <th>Billing  (ugx 2,334,590)</th>
                                        </thead>
                                        <tbody>
                                            {
                                                namespace.deployments.map((deployment) => {
                                                    return (
                                                        <tr>
                                                            <td> { deployment.name } </td>
                                                            <td><span class={ `badge badge-${ deployment.status === 'okey' ? 'success' : 'danger' } aLittleMargin` }>{ deployment.status }</span></td>
                                                            <td> UGX { deployment.bill } </td> 
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
}
