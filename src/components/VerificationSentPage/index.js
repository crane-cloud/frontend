import React from 'react';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import './VerificationSentPage.css';

const VerificationSentPage = () => (
  <div className="VerificationPageContainer">
    <div className="VerificationPageHeader">
      <Header />
    </div>
    <div className="VerificationPageMain">
      <div className="VerificationPageContent">
        <h2>Thank you for registering with us!</h2>
        <p>
          We&apos;ve sent a link to your email address:&nbsp;
          <span>email.com</span>
          .
          <br />
          <br />
          The link will expire after 24 hours. Please use this link to activate and start using your account.
        </p>
      </div>
    </div>
    <div className="VerificationPageFooter">
      <LandingFooter />
    </div>
  </div>
);

export default VerificationSentPage;
