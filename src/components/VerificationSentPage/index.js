import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
      loading: false
    };
  }

  async componentDidMount() {
    const { match, history, saveUser } = this.props;
    const { token } = match.params;

    await axios
      .get(`${API_BASE_URL}/users/verify/${token}`)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            isTokenChecked: true
          });

          // redirect to dashboard
          setTimeout(() => {
            // save user data to store and log them in
            saveUser(response.data.data);
            history.push('/clusters');
          }, 1000);
        }
      })
      .catch((error) => {
        this.setState({
          isTokenChecked: true,
          isVerificationFailed: true
        });
        console.log(error);
      });
  }

  render() {
    const {
      loading,
      isTokenChecked,
      isVerificationFailed,
      email
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
                <h2>Oops! Account verification failed!</h2>
                <p>Looks like your link expired. Worry not! Just enter your email below and we&apos;ll send you another link.</p>
                <InputText
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
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
