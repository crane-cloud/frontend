import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import DotsImg from '../../assets/images/3dots.svg';
import deleteApp from '../../redux/actions/deleteAppActions';
import Spinner from '../SpinnerComponent';
import Modal from '../Modal';
import './AppsCard.css';
import Status from '../Status';

class AppsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteAlert: false,
      isRemoved: false
    };

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.reloadOndelete = this.reloadOndelete.bind(this);
  }

  handleDeleteApp(e, appId) {
    const { deleteApp } = this.props;
    e.preventDefault();
    deleteApp(appId);
    setTimeout(
      () => {
        this.setState({
          isRemoved: this.props.isDeleted
        });
      }, 1000
    );
  }


  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    this.setState({ openDeleteAlert: false });
  }

  reloadOndelete() {
    this.setState({
      isRemoved: false
    });
    window.location.reload(false);
  }

  render() {
    const {
      name, status, url, appId, isDeleting, isDeleted
    } = this.props;
    const { isRemoved } = this.state;
    const { openDeleteAlert } = this.state;
    return (
      <div className="AppCard">
        <div className="AppCardHeader">
          <table className="AppTable">
            <tr>
              <td className="AppName">{name}</td>
              <td className="OtherData">
                <div className="StatusData">
                  <Status status={status} />
                  <div className="AppDropDown">
                    <img src={DotsImg} alt="three dots" className="DropDownImg" />
                    <div className="AppDropDownContent">
                      <div onClick={() => this.showDeleteAlert()}>Delete</div>
                      <div>Update</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="AppUrlText">Url :</div>
        <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>

        <div className="AppDeleteModel">
          <Modal showModal={openDeleteAlert}>
            <div className="DeleteAppModel">
              <div className="DeleteDescription">
                Are You Sure You want to delete
                {' '}
                {name}
                {' '}
                App?
              </div>
              <div className="DeleteAppModelResponses">
                <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} onClick={(e) => this.handleDeleteApp(e, appId)} />
                {/* {isRemoved && (this.reloadOndelete()) && isDeleted} */}
              </div>
            </div>

          </Modal>
        </div>
      </div>
    );
  }
}

// inititate props
AppsCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool
};

// assigning defaults
AppsCard.defaultProps = {
  isDeleted: false,
  isDeleting: false
};


const mapStateToProps = (state) => {
  const { isDeleting, isDeleted } = state.deleteAppReducer;
  return { isDeleting, isDeleted };
};


export const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appId) => dispatch(deleteApp(appId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppsCard);
