import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import InformationBar from '../InformationBar';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../Spinner';
import Modal from '../Modal';
import SideBar from '../SideBar';
import Feedback from '../Feedback';
import DeleteWarning from '../DeleteWarning';
import tellAge from '../../helpers/ageUtility';
import deleteDatabase, { clearDeleteDatabaseState } from '../../redux/actions/deleteDatabase';
import resetDatabase, { clearDatabaseResetState } from '../../redux/actions/resetDatabase';
import { ReactComponent as CopyText } from '../../assets/images/copy.svg';
import { ReactComponent as Checked } from '../../assets/images/checked.svg';
import { ReactComponent as Open } from '../../assets/images/open.svg';
import { ReactComponent as Closed } from '../../assets/images/close.svg';
import './DBSettingsPage.css';

class DBSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteAlert:false,
      openResetAlert: false,
      error: '',
      hidden: true,
      nameChecked: false,
      portChecked: false,
      userChecked: false,
      hostChecked: false,
      uriChecked: false
    };

    this.handleDeleteDatabase = this.handleDeleteDatabase.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleResetDatabase = this.handleResetDatabase.bind(this);
    this.showResetAlert = this.showResetAlert.bind(this);
    this.hideResetAlert = this.hideResetAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.nameOnClick = this.nameOnClick.bind(this);
    this.portOnClick = this.portOnClick.bind(this);
    this.userOnClick = this.userOnClick.bind(this);
    this.hostOnClick = this.hostOnClick.bind(this);
    this.uriOnClick = this.uriOnClick.bind(this);
  }
  componentDidMount(){
    const { clearDatabaseResetState } = this.props;
    clearDatabaseResetState();
  }

  componentDidUpdate(prevProps) {
    const { dbDeleteMessage, isReset } = this.props;
    
    if (dbDeleteMessage !== prevProps.dbDeleteMessage) {
      this.hideDeleteAlert();
    }

    if (isReset !== prevProps.isReset) {
      this.hideResetAlert();
    }
  }

  getDatabaseInfo(id) {
    const { databases } = this.props;
    const found = databases.find((database) => database.id === id);
    const info = {
      name: found.name,
      user: found.user,
      host: found.host,
      dbID: found.id,
      port:found.port,
      password: found.password,
      age: tellAge(found.date_created)
    };

    return info;
  }

  handleDeleteDatabase(e, projectID, databaseID) {
    const { deleteDatabase } = this.props;
    e.preventDefault();
    deleteDatabase(projectID, databaseID);
  }


  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearDeleteDatabaseState } = this.props;
    clearDeleteDatabaseState();
    this.setState({ openDeleteAlert: false });
  }

  handleResetDatabase(e, projectID, databaseID) {
    const { resetDatabase } = this.props;
    e.preventDefault();
    resetDatabase(projectID, databaseID);
  }


  showResetAlert() {
    this.setState({ openResetAlert: true });
  }

  hideResetAlert() {
    this.setState({ openResetAlert: false });
  }

  renderRedirect = () => {
    const { dbDeleteMessage } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (dbDeleteMessage === 'Database Deleted Successfully') {
      this.hideDeleteAlert();
      return <Redirect to={`/users/${userID}/projects/${projectID}/databases`} noThrow/>
    }
  }

  togglePassword(){
    this.setState({ hidden: !this.state.hidden });
  }

  nameOnClick(){
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.name);
    this.setState({nameChecked: true});
  }
  portOnClick(){
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.port);
    this.setState({portChecked: true});
  }
  hostOnClick(){
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.host);
    this.setState({hostChecked: true});
  }
  userOnClick(){
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.user);
    this.setState({userChecked: true});
  }
  uriOnClick(){
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(`${`mysql -u ${dbInfo.user} -p -P ${dbInfo.port} -h ${dbInfo.host} -D ${dbInfo.name}`}`);
    this.setState({uriChecked: true});
  }
  
  render() {
    const {
      dbDeleteMessage,
      deletingDatabase,
      databaseDeleteFailed,
      isReset,
      isReseting,
      resetMessage,
    } = this.props;
    const { userID, projectID, databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    const {
      openDeleteAlert,
      openResetAlert,
      hidden,
      nameChecked,
      portChecked,
      hostChecked,
      userChecked,
      uriChecked
    } = this.state;
    return (
      <div className="Page">
        {(dbDeleteMessage === 'Database Deleted Successfully') ? (this.renderRedirect() ) : ( null )}
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={dbInfo.name}
              params={this.props.match.params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Settings" />
            </div>
            <div className="ContentSection">
              <div>
                <div className="DatabaseDetail">

                  <div className="DBDetailRow">
                    <div className="DBThead">Type</div>
                    <div className="DBTDetail">MYSQL</div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Name</div>
                    <div className="DBTDetail">{dbInfo.name}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.nameOnClick}/>
                      {nameChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">User</div>
                    <div className="DBTDetail">{dbInfo.user}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.userOnClick}/>
                      {userChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBColumn1 DBThead">Password</div>
                    <div className="DBColumn">
                      {hidden? '***************************': dbInfo.password}
                    </div>
                    <div className="DBIcon">
                      <div onClick={this.togglePassword}>{hidden ?<Open /> :<Closed />}</div>
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Host</div>
                    <div className="DBTDetail">{dbInfo.host}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.hostOnClick}/>
                      {hostChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Port</div>
                    <div className="DBTDetail">{dbInfo.port}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.portOnClick}/>
                      {portChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Created</div>
                    <div className="DBTDetail">{dbInfo.age}</div>
                  </div>
                </div>
              </div>
              <div className="DBInstructions">
                <div className="DBInfoTop">
                  <div>Connecting to the database. Read <a href="https://medium.com/cranecloud/connecting-to-a-remote-mysql-database-a6b3cc15c40b" rel="noopener noreferrer" target="_blank" className="MysqlArticle">this article</a>, for a more comprehensive guide.</div>
                </div>
                <div className="DBInfoBottom">
                  <div className="DBAccessInfo">{`mysql -u ${dbInfo.user} -p -P ${dbInfo.port} -h ${dbInfo.host} -D ${dbInfo.name}`}</div>
                  <div className="DBAccessCopy">
                  <div className="DBIcon">
                      <CopyText onClick={this.uriOnClick}/>
                      {uriChecked ? <Checked /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="DBButtons">
                <div className="DBDetailRow">
                  <PrimaryButton
                    label="Reset Database"
                    className="ResetBtn"
                    onClick={this.showResetAlert}
                  />
                  <div className="buttonText">Deletes all tables and data, but the database remains.</div>
                </div>
                {(resetMessage !== '') && (
                  <Feedback
                    message={resetMessage !== '' ? 'Database has been successfully reset.' : (null)}
                    type={isReset ? 'success' : 'error'}
                  />
                )}
                <div className="DBDetailRow">
                  <PrimaryButton
                    label="Delete Database"
                    className="DBDeleteBtn"
                    onClick={this.showDeleteAlert}
                  />
                  <div className="buttonText">Destroys the entire database, deleting all tables and data.</div>
                </div>
                {(openDeleteAlert && (
                  <div className="ProjectDeleteModel">
                    <Modal showModal={openDeleteAlert} onClickAway={this.hideDeleteAlert}>
                      <div className="DeleteDatabaseModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="InnerModalDescription">
                            Are you sure you want to delete this Database &nbsp;
                            <span>{dbInfo.name} ?</span>
                            <DeleteWarning />
                          </div>
                        </div>

                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                            <PrimaryButton label={deletingDatabase ? <Spinner /> : 'Delete'} className="DeleteBtn" onClick={(e) => this.handleDeleteDatabase(e, projectID, databaseID)} />
                          </div>

                          {(databaseDeleteFailed && dbDeleteMessage) && (
                            <Feedback
                              message={dbDeleteMessage}
                              type="error"
                            />
                          )}
                        </div>
                      </div>

                    </Modal>
                  </div>
                ))}

                {(openResetAlert && (
                  <div className="ProjectDeleteModel">
                    <Modal showModal={openResetAlert} onClickAway={this.hideResetAlert}>
                      <div className="DeleteDatabaseModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="InnerModalDescription">
                            Are you sure you want to reset this Database &nbsp;
                            <span>{dbInfo.name} ?</span>
                            <DeleteWarning />
                          </div>
                        </div>

                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideResetAlert} />
                            <PrimaryButton label={isReseting ? <Spinner /> : 'Reset'} className="ResetBtn" onClick={(e) => this.handleResetDatabase(e, projectID, databaseID)} />
                          </div>

                        </div>
                      </div>

                    </Modal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DBSettingsPage.propTypes = {
  databaseDeleteFailed: PropTypes.bool,
  clearDeleteDatabaseState: PropTypes.func,
  databaseDeleted: PropTypes.bool,
  deletingDatabase: PropTypes.bool,
  dbDeleteMessage: PropTypes.string,
  isReset: PropTypes.bool,
  isReseting: PropTypes.bool,
  resetFailed: PropTypes.bool,
  resetMessage: PropTypes.string
};

DBSettingsPage.defaultProps = {
  dbDeleteMessage: '',
  databaseDeleteFailed: false,
  deletingDatabase: false,
  databaseDeleted: false
};

const mapStateToProps = (state) => {
  const { databases } = state.projectDatabasesReducer;
  const { databaseDeleted,
    deletingDatabase,
    databaseDeleteFailed,
    dbDeleteMessage,
    clearDeleteDatabaseState
  } = state.deleteDatabaseReducer;
  const { isReset,
    isReseting,
    resetFailed,
    resetMessage,
    clearDatabaseResetState
  } = state.resetDatabaseReducer;
  return {
    databases,
    databaseDeleted,
    databaseDeleteFailed,
    deletingDatabase,
    dbDeleteMessage,
    clearDeleteDatabaseState,
    isReset,
    isReseting,
    resetFailed,
    resetMessage,
    clearDatabaseResetState
  };
};

const mapDispatchToProps = {
  deleteDatabase,
  clearDeleteDatabaseState,
  resetDatabase,
  clearDatabaseResetState
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DBSettingsPage));
