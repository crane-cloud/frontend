import React from 'react';
import PrimaryButton from '../PrimaryButton';
import { ReactComponent as InfrastrucurePic } from '../../assets/images/infrastructure.svg';
import './LandingPage.css';

const LandingPage = () => (
  <div className="LandingPageMain">
    <div className="LandingPageMainContent">
      <div className="LandingPageMainContentInfo">
        <h1 className="uppercase extra-bold">managed kubernetes platform</h1>
        <h3 className="bold">Automated container deployment, scaling and management.</h3>
        <PrimaryButton label="get started" />
      </div>
      <div className="LandingPageMainContentImg">
        <InfrastrucurePic className="LandingPageInfrastructurePic" />
      </div>
    </div>
  </div>
);

export default LandingPage;
