import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { Link, withRouter } from 'react-router-dom';
import './AddClusterPage.css';
import BlackInputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import { API_BASE_URL } from '../../config';



class AddClusterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      host: '',
      token: '',
      loading: false
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
      token: this.state.token
    };

    this.setState({
      loading: true
    });

    axios
      .post(`${API_BASE_URL}/clusters`, cluster)
      .then(res => {
        if (res.data.status === 'success') {
          this.setState({
            loading: false
          });
          console.log('Added Cluster...');

          // save cluster data to store
          // this.props.addCluster(res.data.data);
          
          // redirect to dashboard
          setTimeout(() => {
            this.props.history.push('/clusters');
          }, 1000);
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        console.log(err);
        console.log('Was not successful...');
      });
  }


  render() {
    
    return (
      <div className="App">
        <Popup trigger={<button>Click Me</button>} modal className="popup">
          {close =>(
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
                        label={this.state.loading ? <Spinner /> : 'ADD'}
                        onClick={this.handleSubmit}
                      />
                    </div>
                    <a className="AddCancelBtn" onClick={close}>
                      <SecondaryButton isBlack={true} 
                        className="AddCancelBtn"
                        label='CANCEL'
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}
export default AddClusterPage;
