import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import InformationBar from '../InformationBar';
import InformationBarSub from '../InformationBarSub';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import BlackInputText from '../BlackInputText';
import Modal from '../Modal';
import ClustersList from '../ClustersList';
import Header from '../Header';
import AddCluster from '../../redux/actions/addCluster';
import './ClusterPage.css';

class ClusterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      host: '',
      token: '',
      openModal: false
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    this.setState({ openModal: false });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const { AddCluster } = this.props;

    const {
      host,
      name,
      token,
      description
    } = this.state;

    const cluster = {
      host,
      name,
      token,
      description
    };

    AddCluster(cluster);
  }

  render() {
    const {
      host,
      token,
      name,
      description,
      openModal
    } = this.state;

    const {
      user: { accessToken },
      isCreating,
      isAdded,
      isFailed,
      message
    } = this.props;

    localStorage.setItem('token', accessToken);

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          {/* <InformationBar header="Select Infrastructure" showBtn /> */}
          <InformationBarSub header="Select Infrastructure" showBtn btnAction={this.showForm} />
        </div>
        <div className="MainRow">
          <ClustersList />
        </div>
        <div className="FooterRow">
          <p>Copyright © 2020 Crane Cloud. All Rights Reserved.</p>
        </div>

        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal}>
          <div className="ModalForm">
            <div className="ModalFormHeading">
              <h2>Add a cluster</h2>
            </div>
            <div className="ModalFormInputs">
              <div className="ModalFormInputsBasic">
                <BlackInputText
                  placeholder="Host"
                  name="host"
                  value={host}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  placeholder="Token"
                  name="token"
                  value={token}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />

                <div className="ModalFormButtons AddAddButtons">
                  <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideForm} />
                  <PrimaryButton label={isCreating ? <Spinner /> : 'add'} onClick={this.handleSubmit} />
                </div>
                {(isFailed || isAdded) && (
                  <div className={isAdded ? 'AppFormErrorDiv CreateSuccess' : 'AppFormErrorDiv CreateFail'}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ClusterPage.propTypes = {
  AddCluster: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

const mapStateToProps = ({ user, AddClusterReducer }) => {
  const {
    isCreating,
    isAdded,
    isFailed,
    errorOccured,
    message
  } = AddClusterReducer;

  return {
    user,
    isCreating,
    isAdded,
    isFailed,
    errorOccured,
    message
  };
};

export default connect(mapStateToProps, { AddCluster })(withRouter(ClusterPage));
