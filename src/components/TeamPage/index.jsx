import React from 'react';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import './TeamPage.css';
import MemberCard from '../MemberCard';
import Engineer from '../../assets/images/Engineer.png';
import Alex from '../../assets/images/Alex.png';
import Aminah from '../../assets/images/Aminah.png';
import Greatest from '../../assets/images/Greatest.png';
import Allan from '../../assets/images/Allan.png';
import Henry from '../../assets/images/Henry.png';
import Dorothy from '../../assets/images/Dorothy.png';
import Steve from '../../assets/images/Steve.png';
import Paul from '../../assets/images/Paul.png';
import Colin from '../../assets/images/Colin.png';
import Mary from '../../assets/images/Mary.png';
import Rajab from '../../assets/images/Rajab.png';

class TeamPage extends React.Component {

  render() {
    return (
      <div className="TeamPageContainer">
        <Header />
        <div className="TeamImagesRow">
            <MemberCard
              name="Engineer Bainomugisha"
              title="Team Lead"
              icon={Engineer}
            />
            <MemberCard
              name="Mwotil Alex"
              title="Product Manager"
              icon={Alex}
            />

            <MemberCard
              name="Aminah Zawedde"
              title="Senior Researcher"
              icon={Aminah}
            />

            <MemberCard
              name="Dora Bampangana"
              title="Project Administrator"
              
            />
            <MemberCard
              name="Dorothy Ankunda"
              title="Business Development Lead"
              icon={Dorothy}
            />

            <MemberCard
              name="Asiimwe Innocent"
              title="Senior Engineer"
              
            />
            <MemberCard
              name="Colin Wagaba"
              title="Tech Lead"
              icon={Colin}
              
            />
            <MemberCard
              name="Steve Araka"
              title="Software Engineer"
              icon={Steve}
            />
            <MemberCard
              name="Derrick Sekidde"
              title="Software Engineer"
              icon={Greatest}
            />
            <MemberCard
              name="Mubangizi Allan"
              title="Software Engineer"
              icon={Allan}
            />
            <MemberCard
              name="Mutegeki Henry"
              title="Software Engineer"
              icon={Henry}
            />
            <MemberCard
              name="Ssekamatte James"
              title="Researcher"
              
            />

            <MemberCard
              name="Nagitta Mary Magdalene"
              title="Software Engineer Intern"
              icon={Mary}
            />

            <MemberCard
              name="Kamasu Paul"
              title="Software Engineer Intern"
              icon={Paul}
            />

            <MemberCard
              name="Semakula Rajab"
              title="Software Engineer Intern"
              icon={Rajab}
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
