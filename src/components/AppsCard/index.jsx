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
      openDropDown: false,
      isRemoved: false,
      buttonClicked: false
    };

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.reloadOndelete = this.reloadOndelete.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
  }

  showDropDown() {
    this.setState({ openDropDown: true });
  }

  toggleDropDown() {
    const { openDropDown } = this.state;
    if (openDropDown) {
      this.hideDropDown();
    } else {
      this.showDropDown();
    }
  }

  hideDropDown() {
    this.setState({ openDropDown: false });
  }

  handleDeleteApp(e, appId) {
    const { deleteApp, isDeleted, isFailed } = this.props;
    e.preventDefault();
    deleteApp(appId);
    if (isDeleted) {
      this.setState({
        isRemoved: isDeleted,
        openDeleteAlert: false,
      });
    }
    this.setState({
      buttonClicked: true
    });
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
      name, status, url, appId, isDeleting, isDeleted, isFailed
    } = this.props;
    const { isRemoved, buttonClicked } = this.state;
    const { openDeleteAlert, openDropDown } = this.state;
    return (
      <div className="AppCard">
        <div className="AppCardHeader">
          <table className="AppTable">
            <tr>
              <td className="AppName">{name}</td>
              <td className="OtherData">
                <div className="StatusData">
                  <Status status={status} />
                  <div className="AppDropDown" onClick={() => this.toggleDropDown()}>
                    <img src={DotsImg} alt="three dots" className="DropDownImg" />
                    {openDropDown && (
                      <div className="AppDropDownContent">
                        <div onClick={() => this.showDeleteAlert()}>Delete</div>
                        <div>Update</div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="AppUrlText">Url :</div>
        <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>

        {(openDeleteAlert && (
          <div className="AppDeleteModel">
            <Modal showModal={openDeleteAlert}>
              <div className="DeleteAppModel">
                <div className="DeleteDescription">
                  Are you sure you want to delete
                  <span>
                    <b>
                      {' '}
                      {name}
                      {' '}
                    </b>
                  </span>
                  ?
                </div>
                <div className="DeleteAppModelResponses">
                  <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                  <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} onClick={(e) => this.handleDeleteApp(e, appId)} />
                  {/* {isRemoved && (this.reloadOndelete()) && isDeleted} */}
                </div>
                {isFailed && buttonClicked && (
                  <div className="DeleteErrorDiv">
                    Failed to delete App, try again later
                  </div>
                )}
              </div>

            </Modal>
          </div>
        ))}
      </div>
    );
  }
}

// inititate props
AppsCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isFailed: PropTypes.bool,
};

// assigning defaults
AppsCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false
};


const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed } = state.deleteAppReducer;
  return { isDeleting, isDeleted, isFailed };
};


export const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appId) => dispatch(deleteApp(appId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppsCard);
