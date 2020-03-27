import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './ForgotPasswordVerification.css';
import { API_BASE_URL } from '../../config';

class ForgotPasswordVerification extends React.Component {
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
    const { match, history } = this.props;
    const { token } = match.params;

    await axios
      .get(`${API_BASE_URL}/users/reset_password/${token}`)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            isTokenChecked: true
          });

          // redirect to password_reset page
          setTimeout(() => {
            history.push('/new-password');
          }, 1000);
        }
      })
      .catch((error) => {
        this.setState({
          isTokenChecked: true,
          isVerificationFailed: true
        });
      });
  }

  render() {
    const { } = this.state;

    return (

      <div></div>
    );
  }
}


export default (withRouter(ForgotPasswordVerification));
