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
              name="Engineer Bainomugisha"
              title="Team Lead"
              
            />
            <MemberCard
              name="Mwotil Alex"
              title="Product Manager"
              
            />

            <MemberCard
              name="Aminah Zawedde"
              title="Senior Researcher"
              
            />

            <MemberCard
              name="Dora Bampangana"
              title="Project Administrator"
              
            />
            <MemberCard
              name="Dorothy Ankunda"
              title="Business Development Lead"
              
            />

            <MemberCard
              name="Asiimwe Innocent"
              title="Senior Engineer"
              
            />
            <MemberCard
              name="Collin Wagaba"
              title="Tech Lead"
              
            />
            <MemberCard
              name="Steve Araka"
              title="Software Engineer"
              
            />
            <MemberCard
              name="Derrick Sekidde"
              title="Software Engineer"
              
            />
            <MemberCard
              name="Mubangizi Allan"
              title="Software Engineer"
              
            />
            <MemberCard
              name="Mutegeki Henry"
              title="Software Engineer"
              
            />
            <MemberCard
              name="Ssekamatte James"
              title="Researcher"
              
            />

            <MemberCard
              name="Nagitta Mary Magdalene"
              title="Software Engineer Intern"
              
            />

            <MemberCard
              name="Kamasu Paul"
              title="Software Engineer Intern"
              
            />

            <MemberCard
              name="Semakula Rajab"
              title="Software Engineer Intern"
              
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
