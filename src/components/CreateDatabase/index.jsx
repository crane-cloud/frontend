import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton';
import Select from '../Select';
import CancelButton from '../CancelButton';
import Spinner from '../Spinner';
import Feedback from '../Feedback';
import createDatabase, { clearDatabaseCreateState } from '../../redux/actions/createDatabase';
import './CreateDatabase.css';

const flavours = [
  { name: 'MYSQL', id: 1, value: 'MYSQL' }
];

class CreateDatabase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseFlavour: '',
      error: ''
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount() {
    const { clearDatabaseCreateState } = this.props;
    clearDatabaseCreateState();
  }

  handleSelectChange(selected) {
    this.setState({ databaseFlavour: selected.value });
  }

  handleSubmit() {
    const { databaseFlavour } = this.state;
    const { createDatabase, projectID } = this.props;
    if(!databaseFlavour) {
      this.setState({
        error: 'Select a database flavour'
      });
    } else {
      createDatabase({}, projectID);
    }
  }

  renderRedirect = () => {
    const { isCreated } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (isCreated) {
      return <Redirect to={`/users/${userID}/projects/${projectID}/databases`} noThrow/>
    }
  }

  render() {
    const { isCreating, isCreated, message } = this.props;
    const { error } = this.state;

    return (
      <div>
        { isCreated ? (this.renderRedirect() ) : ( null ) }
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <div className="InformationBar">
              <div className="InformationBarWithButton">
                <div className="InfoHeader">Create database</div>
                <div className="RoundAddButtonWrap">
                  <CancelButton onClick={this.props.closeComponent} />
                </div>
              </div>
            </div>
          </div>
          <div className="ContentSection">
            <div>
              <div className="DatabaseForm">

                <div className="DBFormElements">
                  <Select
                    required
                    placeholder="Database Type"
                    options={flavours}
                    onChange={this.handleSelectChange}
                  />
                  <div />
                  <div>
                    {error && (
                      <Feedback
                        type="error"
                        message={error}
                      />
                    )}
                  </div>
                  <div className="DBButtons">
                    <div className="DBDetailRow">
                      <PrimaryButton
                        label={isCreating ? <Spinner /> : 'Create'}
                        className="CreateBtn"
                        onClick={this.handleSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {message && (
                <Feedback
                  message={message !== '' ? message : (null)}
                  type={isCreated ? 'success' : 'error'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateDatabase.propTypes = {
  // clearDeleteProjectState: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  isCreated: PropTypes.bool,
  message: PropTypes.string
};

CreateDatabase.defaultProps = {
  message: '',
  isCreated: false,
  isCreating: false
};

const mapStateToProps = (state) => {
  const {
    isCreating, isCreated, clearDatabaseCreateState, message
  } = state.createDatabaseReducer;

  return {
    isCreating,
    message,
    isCreated,
    clearDatabaseCreateState,
  };
};

const mapDispatchToProps = {
  createDatabase, clearDatabaseCreateState
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDatabase);
