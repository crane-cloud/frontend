import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CreateAppForm.css';
import BlackInputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';


class CreateAppForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      link: ''
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
    const app = {
      name: this.state.name,
      link: this.state.link
    };

    this.setState({
      loading: true
    });

    const { CreateApp } = this.props;
    CreateApp(app);
  }


  render() {
    const { isAdded, isFailed, errorOccured } = this.props;
    return (
      <div className="AddPageContainer" model="user"
        onSubmit={(values) => this.handleSubmit(values)}
      >

        <div className="AddPageContent">
          <div className="AddHeading">
            Deploy an App
          </div>
          <div className="AddFormInputs">
            {/* Input fields */}
            <BlackInputText
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <BlackInputText
              placeholder='Image Url'
              name='link'
              value={this.state.link}
              onChange={(e) => {
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
                  <div> Failed to Create App</div>
                ):
                (<div/>)
              }
              {
                isAdded && <div>App has been successfully created </div>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }



}


// inititate props
CreateAppForm.propTypes = {
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
  {  }
)(CreateAppForm);
  