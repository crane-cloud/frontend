import React from 'react';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import './TeamPage.css';
import MemberCard from '../MemberCard';

class TeamPage extends React.Component {

  render() {
    return (
      <div className="TeamPageContainer">
        <Header />
        <div className="TeamImagesRow">
            {/* <img className="TeamMemberImage" alt="" />
            <img className="TeamMemberImage" alt="" /> */}
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
            <MemberCard
              name="Derrick Mukisa"
              title="DevOps Engineer"
              
            />
        </div>
        <div className="TeamPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}

export default TeamPage;
