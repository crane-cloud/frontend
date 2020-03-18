import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AddProjectForm.css';
import BlackInputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import AddProject from '../../redux/actions/addProject';



class AddProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      cluster_ID: '',
      alias: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // let data = this.props.data;

  handleSubmit() {
    const project = {
      alias: this.state.alias,
      name: this.state.name,
      cluster_ID: this.state.token,
      owner_ID: this.state.data.id
    };

    this.setState({
      loading: true
    });
    const { AddProject } = this.props;
    
    AddProject(project);

  }


  render() {
    const { isAdded, isFailed, errorOccured } = this.props;
    
    return (
      <div className="AddPageContainer" model="user"
        onSubmit={(values) => this.handleSubmit(values)}>

        <div className="AddPageContent">
          <div className="AddHeading">
            Add a Project
          </div>
          <div className="AddFormInputs">
            {/* Input fields */}
            <BlackInputText
              placeholder='Cluster ID'
              name='cluster_ID'
              value={this.state.cluster_ID}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <BlackInputText
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <BlackInputText
              placeholder='Alias'
              name='alias'
              value={this.state.alias}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            {/* <BlackInputText
              placeholder='Description'
              name='description'
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            /> */}

            <div className='AddButtons'>
              <div className="AddBtn">
                <PrimaryButton 
                  label={this.state.isSending ? <Spinner /> : 'ADD'}
                  onClick={this.handleSubmit}
                />
              </div>
              <Link className="AddCancelBtn" onClick={this.props.close}>
                <SecondaryButton isBlack={true} 
                  className="AddCancelBtn"
                  label='CANCEL'
                />
              </Link>
            </div>
            <div className="Info-div">
              {/* If error arises */}
              { isFailed === true && errorOccured === 500 ?
                (
                  <div> Failed to Add Project</div>
                ):
                (<div/>)
              }
              {
                isAdded && <div>Project has been successfully added </div>
              }
                      
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// inititate props
AddProjectForm.propTypes = {
  AddProject:PropTypes.func.isRequired,
  isAdded:PropTypes.bool.isRequired,
  isFailed:PropTypes.bool.isRequired
};


export const mapStateToProps = state => {
  const { isAdded, isFailed, project, errorOccured} = state.AddProjectReducer;
  const { data } = state.user;
  return { isAdded, isFailed, project, errorOccured, data};
};

export default connect(
  mapStateToProps,
  { AddProject }
)(AddProjectForm);

