import React from 'react';
import Header from '../Header';
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
import Dora from '../../assets/images/Dora.jpg';
import Inno from '../../assets/images/Inno.jpg';
import James from '../../assets/images/James.jpg';

const members = [
  {id: 1, name: 'Engineer Bainomugisha', title: 'Project Lead', icon: Engineer},
  {id: 2, name: 'Alex Mwotil', title: 'Project Manager', icon: Alex},
  {id: 3, name: 'Aminah Zawedde', title: 'Senior Researcher', icon: Aminah},
  {id: 4, name: 'Dora Bampangana', title: 'Project Administrator', icon: Dora},
  {id: 5, name: 'Dorothy Ankunda', title: 'Business Development Lead', icon: Dorothy},
  {id: 6, name: 'Innocent Asiimwe', title: 'DevOps Engineer', icon: Inno },
  {id: 7, name: 'Colin Wagaba', title: 'DevOps Engineer', icon: Colin},
  {id: 8, name: 'Steve Araka', title: 'DevOps Engineer', icon: Steve},
  {id: 9, name: 'Derrick Sekidde', title: 'DevOps Engineer', icon: Greatest},
  {id: 10, name: 'Allan Mubangizi', title: 'Student Developer', icon: Allan},
  {id: 11, name: 'Henry Mutegeki', title: 'Student Developer', icon: Henry},
  {id: 12, name: 'James Ssekamatte', title: 'Researcher', icon: James },
  {id: 13, name: 'Mary Magdalene Naggita', title: 'Intern', icon: Mary},
  {id: 14, name: 'Paul Kamasu', title: 'Intern', icon: Paul},
  {id: 15, name: 'Rajab Ssemakula', title: 'Intern', icon: Rajab},
];

const TeamPage = () => (
  <div className="TeamPageContainer">
    <Header />
    <div className="TeamImagesRow">
      {(members.map((member) => (
        <MemberCard
          key={member.id}
          name={member.name}
          title={member.title}
          icon={member.icon}
        />
      )))}

    </div>
    <div className="TeamPageFooter">
      <footer className="TeamFooter">
        <p className="TeamFooterCopyright">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Crane Cloud. All Rights Reserved.
        </p>
      </footer>
    </div>
  </div>
);

export default TeamPage;
