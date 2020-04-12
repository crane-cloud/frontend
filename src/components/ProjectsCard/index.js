import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import DotsImg from '../../assets/images/3dots.svg';
import './ProjectsCard.css';

class ProjectsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteAlert: false,
      openDropDown: false,
      deleteFeedback: ''
    };

    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
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

  handleDeleteProject(e, projectID) {
    const {
      deleteProject, isDeleted, isFailed
    } = this.props;
    e.preventDefault();

    deleteProject(projectID);
    if (isDeleted) {
      this.setState({
        deleteFeedback: 'Project has been Deleted.'
      });
      setTimeout(
        () => {
          this.setState({
            openDeleteAlert: false,
            deleteFeedback: ''
          });
        }, 1000
      );
    }

    if (isFailed) {
      this.setState({
        deleteFeedback: 'Failed to delete Project. Try again'
      });
      setTimeout(
        () => {
          this.setState({
            deleteFeedback: ''
          });
        }, 3000
      );
    }
  }


  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    this.setState({ openDeleteAlert: false });
  }

  render() {
    const {
      name, status, url, projectID, isDeleting, description, icon
    } = this.props;
    const { openDeleteAlert, openDropDown, deleteFeedback } = this.state;
  return (
    <div className="ProjectsCard">
      <div className="CardImageDiv" style={{ backgroundImage: `url(${icon})` }} />
      <div className="BottomContainer">
        <div className="ProjectsCardName">{name}</div>
        <div className="ProjectsCardDesc">{description}</div>
        <div className="ProjectDropDown" onClick={() => this.toggleDropDown()}>
          <img src={DotsImg} alt="three dots" className="DropDownImg" />
          {openDropDown && (
            <div className="ProjectDropDownContent">
              <div onClick={() => this.showDeleteAlert()}>Delete</div>
              <div>Update</div>
            </div>
          )}
        </div>
      </div>
      {(openDeleteAlert && (
          <div className="ProjectDeleteModel">
            <Modal showModal={openDeleteAlert}>
              <div className="DeleteProjectModel">
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
                <div className="DeleteProjectModelResponses">
                  <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                  <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} onClick={(e) => this.handleDeleteProject(e, projectID)} />
                </div>
                <div className="DeleteMessageDiv">
                  {deleteFeedback && (
                    <div className={deleteFeedback.startsWith('Failed') ? 'DeleteErrorDiv' : 'DeleteSuccessDiv'}>
                      {deleteFeedback}
                    </div>
                  )}
                </div>
              </div>

            </Modal>
          </div>
        ))}
    </div>

  );
};

ProjectsCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isFailed: PropTypes.bool,
};

// assigning defaults
ProjectsCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false
};


const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed } = state.deleteProjectReducer;
  return { isDeleting, isDeleted, isFailed };
};


export const mapDispatchToProps = (dispatch) => ({
  deleteProject: (projectID) => dispatch(deleteProject(projectID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCard);
