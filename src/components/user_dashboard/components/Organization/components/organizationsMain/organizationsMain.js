import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import library css
import Modal from 'react-awesome-modal';


import Header from '../header';
import NamespaceModal from './components/namespaceModal';
import './organizationsMain.css';
import { BASE_URL } from '../../../../../../config';
import Spinner from '../../../../../common/Spinner';

const mapStateToProps = (state) => ({
  allOrganizations: state.org.organizations
});

const matchDispatchToProps = {
  // storeOrganizations: orgActions.storeOrganizations
};


class OrganizationsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organizationNameSpaces: [],
      orgModalVisible: false,
      renameValue: '',
      spinner: false,
      successFeedback: '',
      errorFeedback: ''
    };


    this.orgID = this.props.orgID;


    this.org = props.allOrganizations.filter((org) => {
      return org.id === parseInt(props.orgID, 10);
    });
  }

  namespaceChangeValue = '';

  organizationNameSpaces = {
    orgName: 'org name',
    namespaces: [
      {
        name: 'TrainCo',
        namespaceID: 46748,
        deployments: [
          {
            name: 'Kampala Trians',
            deploymentID: 56473,
            status: 'okey',
            billing: 354676
          },
          {
            name: 'Gulu Buses',
            deploymentID: 567493,
            status: 'error',
            billing: 35566
          }
        ]
      },
      {
        name: 'Farms Co',
        namespaceID: 46749,
        deployments: [
          {
            name: 'Tororo Maize',
            deploymentID: 67484,
            status: 'error',
            billing: 578373
          },
          {
            name: 'Jinja Beans',
            deploymentID: 67483,
            status: 'okey',
            billing: 675843
          }
        ]
      }
    ]
  };

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
            console.log(this.org[0].name);

            const payload = {
              organisation_name: this.org[0].name
            };

            axios.delete(`${BASE_URL}/delete/organisation`, payload)
              .then((response) => {
                console.log(response);
                debugger;
              })
              .catch((deleteError) => {
                if (deleteError.response && deleteError.response.data && deleteError.response.data.message) {

                }
              });
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  renderOrgname = () => {
    return (
      <h2 className="text-center mx-3"> {this.org[0].name}
        <span className="dropdown manageOrgMenu">
          <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="fa fa-ellipsis-v"></span>
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button" onClick={this.openRenameOrgModal}>Rename Organization</button>
            <button className="dropdown-item" type="button" onClick={this.deleteOrg}>Delete Organization</button>
          </div>
        </span>
      </h2>
    )
  }

  openRenameOrgModal = () => {
    this.setState({
      orgModalVisible: true
    });
  }

  closeRenameOrgModal = () => {
    this.setState({
      orgModalVisible: false
    });
  }

  handleChange = (event) => {
    this.setState({ renameValue: event.target.value });
  }

  handleRename = () => {
    /* hit rename url */
    // /organizations/orgID/rename/new-name
    // eg /organizations/46739/rename/nile breweries
    // org id available via this.orgID
    alert(`new name is: ${this.state.renameValue}`);
    this.setState({ orgModalVisible: false });
  }

  renameOrgModalSpan = () => (
    <span className='text-center renameSpanModal'>
      <Modal visible={this.state.orgModalVisible} width="40%" height="50%" effect="fadeInUp" onClickAway={() => this.closeRenameOrgModal()}>
        <div className='modalContainer'>
          <h3>Rename Organization</h3>
          <form>
            <input type="text" className="form-control" placeholder="Rename organization" onChange={this.handleChange} />
          </form>
          <div className='buttons'>
            <input type='button' className="modalBtn btn btn-outline-info" onClick={() => this.closeRenameOrgModal()} value='cancel' />
            <input type='button' className="modalBtn btn btn-outline-info" onClick={this.handleRename} value='Rename ORG' />
          </div>
        </div>
      </Modal>
    </span>
  )

  handleNewNamespaceChange = (event) => {
    this.namespaceChangeValue = event.target.value;
    this.setState({
      successFeedback: '',
      errorFeedback: '',
      spinner: false
    });
  }

  handleNewNamespace = () => {
    this.setState({
      successFeedback: '',
      errorFeedback: '',
      spinner: true
    });

    const payload = {
      namespace: this.namespaceChangeValue,
      organisation_name: this.org[0].name
    };

    axios.post(`${BASE_URL}/add/namespace`, payload)
      .then((response) => {
        /* response contains new namespace details */
        if (response.status === 201) {
          this.setState({
            spinner: false,
            successFeedback: `${response.data.name} created successfully`
          });
        }
      })

      .catch((error) => {
        console.log(error.stack);
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            spinner: false,
            errorFeedback: error.response.data.message
          });
        } else if (error.response && error.response.statusText) {
          this.setState({
            spinner: false,
            errorFeedback: `Error ocuured: ${error.response.statusText}. Please try again`
          });
        } else {
          this.setState({
            spinner: false,
            errorFeedback: `Error occured: ${error.message}. Please try again`
          });
        }
      });
  }

  newNamespace = () => (
    <>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary new-namespace" data-toggle="modal" data-target="#exampleModalScrollable">
        <span className="fa fa-plus"></span>  New Namespace</button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalScrollableTitle">Create Namespace</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.state.errorFeedback
                && <div className="alert alert-danger text-center">
                  {this.state.errorFeedback}
                </div>
              }
              {this.state.successFeedback
                && <div className="alert alert-success text-center">
                  {this.state.successFeedback}
                </div>
              }
              <div className="form-group">
                <label>Create Namespace</label>
                <input required type="text" className="form-control" placeholder="Add a new namespace" onChange={this.handleNewNamespaceChange} />
              </div>

              {this.state.spinner
                && <div className="form-group">
                  <Spinner />
                </div>
              }

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.handleNewNamespace}>Save</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )

  renderNameSpaces = () => (
    <div className="row">
      {
        this.state.organizationNameSpaces.map((namespace, index) => {
          let totalBill = 0;
          namespace.deployments.map((dep) => {
            totalBill += dep.billing;
            return;
          });

          return (
            <div className="col-6 mb-5" key={index}>
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
                        namespace.deployments.map((deployment) => (
                          <tr key={index}>
                            <td> <Link to={`/deployments/${deployment.deploymentID}`}> {deployment.name} </Link></td>
                            <td><span className={`badge badge-${deployment.status === 'okey' ? 'success' : 'danger'} aLittleMargin`}>{deployment.status}</span></td>
                            <td> UGX {deployment.billing} </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      }

    </div>
  )

  render() {
    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <Header />
        {this.renderOrgname()}
        {this.renameOrgModalSpan()}
        {this.newNamespace()}
        {this.renderNameSpaces()}
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(OrganizationsMain));
