import React from 'react';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import './TeamPage.css';

class TeamPage extends React.Component {

  render() {
    return (
      <div className="TeamPageContainer">
        <Header />
        <div className="LoginContent">
        </div>
        <div className="TeamPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}

export default TeamPage;
