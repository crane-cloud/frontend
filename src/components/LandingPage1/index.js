import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PrimaryButton from '../PrimaryButton';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import { ReactComponent as InfrastrucurePic } from '../../assets/images/infrastructure.svg';
import './LandingPage1.css';

const LandingPage1 = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  return (
    <div className="LandingPageMain">
      <Header />
      <div className="LandingPageMainContent">
        <div className="LandingPageMainContentInfo">
          <div>
            <h1 className="uppercase extra-bold">managed cloud service</h1>
            <h3 className="bold">Automated application deployment, scaling and management.</h3>
            {
              user ? (
                <Link to={`/users/${user.data.id}/projects`}><PrimaryButton label="get started" /></Link>
              ) : (
                <Link to="/register"><PrimaryButton label="get started" /></Link>
              )
            }

          </div>
        </div>
        <div className="LandingPageMainContentImg">
          <InfrastrucurePic className="LandingPageInfrastructurePic" />
        </div>
      </div>
      <div className="LandingPageFooter">
        <LandingFooter />
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};


export default connect(mapStateToProps)(withRouter(LandingPage1));
