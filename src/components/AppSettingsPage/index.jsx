import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import deleteApp, { clearState } from '../../redux/actions/deleteApp';
import InformationBar from '../InformationBar';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../Spinner';
import Modal from '../Modal';
import SideBar from '../SideBar';
import Feedback from '../Feedback';
import DeleteWarning from '../DeleteWarning';
import './AppSettingsPage.css';

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteAlert: false,
      error: ''
    };


    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleDeleteApp(appId){
    const {
      deleteApp
    } = this.props;

    deleteApp(appId);
  };


  showDeleteAlert(){
    // setDeleteAlert(true);
  };

  hideDeleteAlert(){
    const {isDeleted} = this.props;
    clearState();
    // setDeleteAlert(false);
    if (isDeleted) {
      // hasDeleted();
    }
  };
  renderRedirect = () => {
    const { isDeleted, isUpdated } = this.props;
    const { userID } = this.props.match.params;
    if (isDeleted || isUpdated) {
      return <Redirect to={`/users/${userID}/projects`} noThrow/>
    }
  }

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      message,
      isFailed
    } = this.props;
    const {
      openDeleteAlert,
      error
    } = this.state;
    const { name } = this.props.location;
    console.log(this.props);
    return (
      <div className="Page">
        { isDeleted ? (this.renderRedirect() ) : ( null )}
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={name}
              params={params}
              // description={description}
              pageRoute={this.props.location.pathname} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Settings"
              />
            </div>
            <div className="ContentSection">
                  Derek The Greatest
              <div className="DeleteButtonDiv">
                <PrimaryButton label="Delete App" className="DeleteBtn" onClick={this.showDeleteAlert} />
              </div>
              {(openDeleteAlert && (
                <div className="AppDeleteModel">
                  <Modal showModal={openDeleteAlert}>
                    <div className="DeleteAppModel">
                      <div className="DeleteModalUpperSection">
                        <div className="DeleteDescription">
                          Are you sure you want to delete&nbsp;
                          <span>{name}</span>
                            &nbsp;
                          ?
                        </div>
                        <DeleteWarning />
                      </div>

                      <div className="DeleteModalLowerSection">
                        <div className="DeleteAppModelButtons">
                          <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                          <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} className="DeleteBtn" onClick={(e) => this.handleDeleteApp(e, params.projectID)} />
                        </div>

                        {message && (
                          <Feedback
                            type={isFailed ? 'error' : 'success'}
                            message={message}
                          />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    );
  }
}

AppSettingsPage.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isFailed: PropTypes.bool,
  name: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired, // this is static
  url: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  deleteApp: PropTypes.func.isRequired,
  hasDeleted: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

AppSettingsPage.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false
};

const mapStateToProps = (state) => {
  const {
    isDeleting, isDeleted, isFailed, message
  } = state.deleteAppReducer;
  return {
    isDeleting, isDeleted, isFailed, message
  };
};

const mapDispatchToProps = {
  deleteApp, clearState
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
