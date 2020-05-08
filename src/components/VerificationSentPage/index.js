import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveUser from '../../redux/actions/saveUser';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import './VerificationSentPage.css';
import { API_BASE_URL } from '../../config';

class VerificationSentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isTokenChecked: false,
      isVerificationFailed: false,
      loading: false,
      feedback: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    const { match, saveUser } = this.props;
    const { token } = match.params;

    axios
      .get(`${API_BASE_URL}/users/verify/${token}`)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            isTokenChecked: true
          });

          // redirect to dashboard
          // save user data to store and log them in
          saveUser(response.data.data);
          localStorage.setItem('token', response.data.data.access_token);
          this.setState(
            {
              feedback: 'Login successful'
            },
            () => {
              window.location.href = `/users/${response.data.data.id}/projects`;
            }
          );
        }
      })
      .catch((/* error */) => {
        this.setState({
          isTokenChecked: true,
          isVerificationFailed: true,
          feedback: 'Oops! Account verification failed!'
        });
      });
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {
      loading,
      isTokenChecked,
      isVerificationFailed,
      email,
      feedback
    } = this.state;

    return (
      <div className="VerificationPageContainer">
        <div className="VerificationPageHeader">
          <Header />
        </div>
        <div className="VerificationPageMain">
          <div className="VerificationPageContent">
            {!isTokenChecked && (
              <>
                <div><Spinner size="Big" /></div>
                <br />
                <div>Please wait...</div>
              </>
            )}
            {isVerificationFailed && (
              <div className="ResendLinkForm">
                <h2>{feedback}</h2>
                {/* eslint-disable-next-line max-len */}
                <p>Looks like your link expired. Worry not! Just enter your email below and we&apos;ll send you another link.</p>
                <InputText
                  required
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => this.handleOnChange(e)}
                />
                <PrimaryButton
                  className="ResendLinkBtn"
                  label={loading ? <Spinner /> : 'Resend Link'}
                  onClick={this.handleSubmit}
                />
              </div>
            )}
          </div>
        </div>
        <div className="VerificationPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}

VerificationSentPage.propTypes = {
  saveUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  saveUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerificationSentPage));
