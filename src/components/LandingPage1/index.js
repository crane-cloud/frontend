import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
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
      <div className="LandingPageMainContainer">
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
        <div className="LandingPageWhySection">
          <div className="LandingPageWhySectionTitle">
            <h2>Why Crane Cloud</h2>
          </div>
          <div className="WhySectionContent">
            <div className="DataCenterImage"></div>
            <div className="WhySectionContainer">
              <div className="WhySectionChildContainer">
                <div className="WhySectionItem InfraOne">
                  <h6 className="WhySectionCardTitle">Infrastructure</h6>
                  <p>Fast, agile, and resilient infrastructure.</p>
                </div>
                <div className="WhySectionItem CosTwo">
                  <h6 className="WhySectionCardTitle">Cost</h6>
                  <p>Reduce costs and save money by getting billed only what you utilize.</p>
                </div>
                <div className="WhySectionItem SecThree">
                  <h6 className="WhySectionCardTitle">Security</h6>
                  <p>Images are automatically scanned for vulnerabilities, and deployed with a free SSL certificate.</p>
                </div>
                <div className="WhySectionItem SuppoFour">
                  <h6 className="WhySectionCardTitle">Support</h6>
                  <p>Create a ticket, chat, or call a specialist regarding any queries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="PageBannerSection">
          <div className="LeftPageBannerSection">
            <div className="LeftPageBannerInner">
              <h2>Migrate to the cloud</h2>
              <p className="BannerParagraph">Governments and institutions are urged to begin digital transformation.</p>
            </div>
          </div>
          <div className="RightPageBannerSection">
            <div className="BannerButtonContainer">
              <button className="BannerButton">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="LandingPageWhySection">
          <div className="LandingPageWhySectionTitle">
            <h2>Explore Crane Cloud Solutions</h2>
          </div>
          <div className="SolutionsSection">
            <div>
              <div></div>
              <div>
                <h3>Containers</h3>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h3>Orcherstration</h3>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h3>Databases</h3>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h3>Registry</h3>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h3>MultiCloud</h3>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h3>Monitoring</h3>
              </div>
            </div>
          </div>
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
