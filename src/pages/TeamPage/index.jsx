import "./TeamPage.css";

import React from "react";

import Alex from "../../assets/images/Alex.png";
import Allan from "../../assets/images/Allan.png";
import Aminah from "../../assets/images/Aminah.png";
import Colin from "../../assets/images/Colin.png";
import Dora from "../../assets/images/Dora.jpg";
import Dorothy from "../../assets/images/Dorothy.png";
import Engineer from "../../assets/images/Engineer.png";
import Greatest from "../../assets/images/Greatest.png";
import Henry from "../../assets/images/Henry.png";
import Inno from "../../assets/images/Inno.jpg";
import Steve from "../../assets/images/Steve.png";
import Header from "../../components/Header";
import MemberCard from "../../components/MemberCard";

const members = [
  {
    id: 1,
    name: "Engineer Bainomugisha",
    title: "Project Lead",
    icon: Engineer,
  },
  { id: 2, name: "Alex Mwotil", title: "Project Manager", icon: Alex },
  { id: 3, name: "Aminah Zawedde", title: "Senior Researcher", icon: Aminah },
  {
    id: 4,
    name: "Dora Bampangana",
    title: "Project Administrator",
    icon: Dora,
  },
  {
    id: 5,
    name: "Dorothy Ankunda",
    title: "Business Development Lead",
    icon: Dorothy,
  },
  { id: 6, name: "Innocent Asiimwe", title: "DevOps Engineer", icon: Inno },
  { id: 7, name: "Colin Wagaba", title: "DevOps Engineer", icon: Colin },
  { id: 8, name: "Steve Araka", title: "DevOps Engineer", icon: Steve },
  { id: 9, name: "Derrick Sekidde", title: "DevOps Engineer", icon: Greatest },
  { id: 10, name: "Allan Mubangizi", title: "DevOps Engineer", icon: Allan },
  { id: 11, name: "Henry Mutegeki", title: "DevOps Engineer", icon: Henry },
];

const TeamPage = () => (
  <div className="TeamPageContainer">
    <Header />
    <div className="TeamImagesRow">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          name={member.name}
          title={member.title}
          icon={member.icon}
        />
      ))}
    </div>
    <div className="TeamPageFooter">
      <footer className="TeamFooter">
        <p className="TeamFooterCopyright">
          Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
        </p>
      </footer>
    </div>
  </div>
);

export default TeamPage;
