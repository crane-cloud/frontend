import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PrimaryButton from '../PrimaryButton';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import { ReactComponent as InfrastrucurePic } from '../../assets/images/infrastructure.svg';
import { ReactComponent as RightArrow } from '../../assets/images/rightArrow.svg';
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
            <h1 className="LandingPageMainContentTitle">Simplified Cloud Hosting</h1>
            <h3 className="bold">
              Crane Cloud is an open source multicloud service layer for highly
              available cloud-based services in Africa. Crane Cloud provides
              compute, network and storage services without lock-in.
            </h3>
            <Link to="/register">
              <button className="Primary-Btn uppercase ButtonSpacing">
                Start Free Trial
                &nbsp; &nbsp;
                <RightArrow />
              </button>
            </Link>

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
