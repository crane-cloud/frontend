import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import library css
import Modal from 'react-awesome-modal';


export default class DeploymentModal extends Component {
    state = {
      visible: false,
      renameValue: ''
    };

    openModal = () => {
      this.setState({
        visible: true
      });
    }

    closeModal = () => {
      this.setState({
        visible: false
      });
    }


    deleteDeployment = () => {
      confirmAlert({
        title: 'Confirm',
        message: 'Delete deployment?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              /* hit delete end point */
              // delete /deployments/deploymentID  available via this.props.depID
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    }

    render() {
      console.log(this.props.depID);
      return (
        <span>
          <span className="dropdown manageOrgMenu">
            <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="fa fa-ellipsis-v"></span>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button" onClick={ this.openModal }>Rename deployment</button>
              <button className="dropdown-item" type="button" onClick={ this.deleteDeployment }>Delete deployment</button>
            </div>
          </span>
          { this.modalSpan() }
        </span>
      );
    }

    handleChange = (event) => {
      this.setState({ renameValue: event.target.value });
    }

    handleRename = () => {
      /* hit rename url */
      // /deployments/deploymentID/rename/new-name
      // eg /deployments/46739/rename/nile breweries
      // depID available via this.props.depID
      alert(`new name is: ${this.state.renameValue}`);
      this.setState({ visible: false });
    }

    modalSpan = () => (
      <span className='text-center renameSpanModal'>
        <Modal visible={this.state.visible} width="40%" height="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className='modalContainer'>
            <h3>Rename Deployment</h3>
            <form>
              <input type="text" className="form-control" placeholder="Rename deployment" onChange={ this.handleChange } />
            </form>
            <div className='buttons'>
              <input type='button' className="modalBtn btn btn-outline-info" onClick={() => this.closeModal()} value='cancel'/>
              <input type='button' className="modalBtn btn btn-outline-info" onClick={ this.handleRename } value='Rename'/>
            </div>
          </div>
        </Modal>
      </span>
    )
}
