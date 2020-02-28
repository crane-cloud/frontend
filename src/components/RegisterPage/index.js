import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import Checkbox from '../Checkbox';
import { API_BASE_URL } from '../../config';

import './RegisterPage.css';

export default class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      hasAgreed: false,
      loading: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getCode = this.getCode.bind(this);
    this.toggleAgreed = this.toggleAgreed.bind(this);
  }

  toggleAgreed(value) {
    this.setState({
      hasAgreed: value
    });
  }

  // getCode() {
  //   if (!this.state.codeLoading) {
  //     this.setState({ codeLoading: true });
  //   }
  //   console.log('Getting veirifcation code...');
  // }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.setState({
      loading: true
    });

    axios
      .post(`${API_BASE_URL}/users`, userData)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            loading: false
          });
          console.log('User registered successfully...');
          setTimeout(() => {
            this.props.history.push('/login');
          }, 1000);
        }
      })
      .catch(error => {
        this.setState({
          loading: false
        });

        console.log('Problem logging in...', error);
        console.log('Email already exists...');
      });
  }

  render() {
    return (
      <div className="RegisterPageContainer">
        <Header />
        <div className="RegisterContent">
          <div className="RegisterContentHeading">
            <h1>Create an account</h1>
          </div>
          <div className="RegisterContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.handleOnChange}

            />
            <InputText
              placeholder='Email Address'
              name='email'
              value={this.state.email}
              onChange={this.handleOnChange}
            />
            {/* <div className="VerificationCodeInput">
              <InputText
                placeholder='Verification Code'
                name='verificationCode'
                value={this.state.verificationCode}
                onChange={this.handleOnChange}
              />
              <div className="VerificationGetCodeBtnSection">
                {!this.state.codeLoading ? (
                  <div className="VerificationGetCodeBtn" onClick={this.getCode}>get code</div>
                ) : <Spinner />
                }
              </div>
            </div> */}
            <InputPassword
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <InputPassword
              placeholder='Repeat Password'
              name='passwordConfirm'
              value={this.state.passwordConfirm}
              onChange={this.handleOnChange}
            />

            <div className="RegisterContentBottomLink RegisterLinkContainer RegisterCheckbox">
              <Checkbox
                onClick={this.toggleAgreed}
              /> &nbsp;  I agree to Crane Cloud&apos;s&nbsp;&nbsp;<Link to='/register' className="RegisterContentLink">Terms of service.</Link>
            </div>

            <PrimaryButton
              label={this.state.loading ? <Spinner /> : 'Register'}
              onClick={this.handleSubmit}
            />
          </div>
        </div>
        <div className="RegisterPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
