import React , { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import library css
import Modal from 'react-awesome-modal';


export default class NamespaceModal extends Component{

    state = {
        visible: false,
        renameValue : ''
    };

    openModal = () => {
        this.setState({
            visible : true
        });
    }

    closeModal = () => {
        this.setState({
            visible : false
        });
    }


    deleteNamespace = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Delete namespace?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    /* hit delete end point */
                    // delete /namespaces/namespaceID  available via this.props.namespaceID
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
    }

    render(){
        return (
        <span>
            <span className="dropdown manageOrgMenu">
                <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="fa fa-ellipsis-v"></span>
                </span>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={ this.openModal }>Rename namespace</button>
                    <button className="dropdown-item" type="button"  onClick={ this.deleteNamespace }>Delete namespace</button>
                </div>
            </span>
            { this.modalSpan() }
            </span>
        )
    }

    handleChange = (event) => {
        this.setState({ renameValue: event.target.value });
    }

    handleRename = () => {
        /* hit rename url */
        // /namespaces/namespaceID/rename/new-name
        // eg /namespaces/46739/rename/nile breweries
        // namespaceID available via this.props.namespaceID
        alert(`new name is: ${ this.state.renameValue }`)
        this.setState({ visible: false });
    }

    modalSpan = () => {
        return (
            <span className='text-center renameSpanModal'>
                <Modal visible={this.state.visible} width="40%" height="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div class='modalContainer'>
                        <h3>Rename namespace</h3>
                        <form>
                            <input type="text" class="form-control" placeholder="Rename namespace" onChange={ this.handleChange } />
                        </form>
                        <div class='buttons'>
                            <input type='button' className="modalBtn btn btn-outline-info" onClick={() => this.closeModal()} value='cancel'/>
                            <input type='button' className="modalBtn btn btn-outline-info" onClick={ this.handleRename } value='Rename'/>
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
}