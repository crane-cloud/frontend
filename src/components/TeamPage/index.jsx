import React from "react";
import Header from "../Header";
import "./TeamPage.css";
import MemberCard from "../MemberCard";
import Engineer from "../../assets/images/Engineer.png";
import Alex from "../../assets/images/Alex.png";
import Aminah from "../../assets/images/Aminah.png";
import Greatest from "../../assets/images/Greatest.png";
import Allan from "../../assets/images/Allan.png";
import Henry from "../../assets/images/Henry.png";
import Dorothy from "../../assets/images/Dorothy.png";
import Steve from "../../assets/images/Steve.png";
import Paul from "../../assets/images/Paul.png";
import Colin from "../../assets/images/Colin.png";
import Mary from "../../assets/images/Mary.png";
import Rajab from "../../assets/images/Rajab.png";
import Dora from "../../assets/images/Dora.jpeg";

const members = [
  {id: 1, name:"Engineer Bainomugisha", title:"Team Lead", icon: Engineer},
  {id: 2, name:"Alex Mwotil", title:"Product Manager", icon: Alex},
  {id: 3, name:"Aminah Zawedde", title:"Senior Researcher", icon: Aminah},
  {id: 4, name:"Dora Bampangana", title:"Project Administrator", icon: Dora},
  {id: 5, name:"Dorothy Ankunda", title:"Business Development Lead", icon: Dorothy},
  {id: 6, name:"Innocent Asiimwe", title:"Senior Engineer" },
  {id: 7, name:"Colin Wagaba", title:"Tech Lead", icon: Colin},
  {id: 8, name:"Steve Araka", title:"Software Engineer", icon: Steve},
  {id: 9, name:"Derrick Sekidde", title:"Software Engineer", icon: Greatest},
  {id: 10, name:"Allan Mubangizi", title:"Software Engineer", icon: Allan},
  {id: 11, name:"Henry Mutegeki", title:"Software Engineer", icon: Henry},
  {id: 12, name:"James Ssekamatte", title:"Researcher" },
  {id: 13, name:"Mary Magdalene Naggita", title:"Software Engineer Intern", icon: Mary},
  {id: 14, name:"Paul Kamasu", title:"Software Engineer Intern", icon: Paul},
  {id: 15, name:"Rajab Ssemakula", title:"Software Engineer Intern", icon: Rajab},
];

class TeamPage extends React.Component {
  render() {
    return (
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
              Copyright © 2020 Crane Cloud. All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default TeamPage;
