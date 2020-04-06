import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AddClusterForm.css';
import BlackInputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import AddCluster from '../../redux/actions/addCluster';



class AddClusterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      host: '',
      token: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const cluster = {
      host: this.state.host,
      name: this.state.name,
      token: this.state.token,
      description: this.state.description
    };

    this.setState({
      loading: true
    });
    const { AddCluster } = this.props;
    
    AddCluster(cluster);

  }


  render() {
    const { isAdded, isFailed, errorOccured } = this.props;
    console.log(errorOccured);
    return (
      <div className="AddPageContainer" model="user"
        onSubmit={(values) => this.handleSubmit(values)}>

        <div className="AddPageContent">
          <div className="AddHeading">
            Add a cluster
          </div>
          <div className="AddFormInputs">
            {/* Input fields */}
            <BlackInputText
              placeholder='Host'
              name='host'
              value={this.state.host}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <BlackInputText
              placeholder='Token'
              name='token'
              value={this.state.token}
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
              placeholder='Description'
              name='description'
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            />

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
                  <div> Failed to Add Cluster</div>
                ):
                (<div/>)
              }
              {
                isAdded && <div>Cluster has been successfully added </div>
              }
                      
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// inititate props
AddClusterForm.propTypes = {
  AddCluster:PropTypes.func.isRequired,
  isAdded:PropTypes.bool.isRequired,
  isFailed:PropTypes.bool.isRequired
};


export const mapStateToProps = state => {
  const { isAdded, isFailed, cluster, errorOccured} = state.AddClusterReducer;
  return { isAdded, isFailed, cluster, errorOccured};
};

export default connect(
  mapStateToProps,
  { AddCluster }
)(AddClusterForm);
