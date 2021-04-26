import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import NewHeader from '../NewHeader';
import LandingFooter from '../LandingFooter';
import { ReactComponent as InfrastrucurePic } from '../../assets/images/infrastructure.svg';
import { ReactComponent as RightArrow } from '../../assets/images/rightArrow.svg';
import { ReactComponent as Databases } from '../../assets/images/databases.svg';
import { ReactComponent as Monitoring } from '../../assets/images/monitoring.svg';
import { ReactComponent as Container } from '../../assets/images/container.svg';
import { ReactComponent as Orch } from '../../assets/images/orcherstration.svg';
import { ReactComponent as Registry } from '../../assets/images/registry.svg';
import { ReactComponent as Cloud } from '../../assets/images/multicloud.svg';
import './LandingPage.css';

const LandingPage = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  return (
    <div className="LandingPageMain">
      <NewHeader />
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
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <Container />
              </div>
              <div className="SolutionsContent">
                <h3>Containers</h3>
                <div>
                  Quickly deploy modern, cloud-native applications
                  or migrate legacy systems to enable rapid
                  incorporation of user feedback for continuous
                  improvement.
                </div>
              </div>
            </div>
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <Orch />
              </div>
              <div className="SolutionsContent">
                <h3>Orcherstration</h3>
                <div>
                  We use Kubernetes to automate application rollouts,
                  rollbacks, and scaling to ensure your users never
                  experience any downtime.
                </div>
              </div>
            </div>
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <Databases />
              </div>
              <div className="SolutionsContent">
                <h3>Databases</h3>
                <div>
                  Create, migrate, and manage data with secure,
                  reliable, and high performance SQL and NoSQL
                  databases from Crane Cloud.
                </div>
              </div>
            </div>
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <div>
                  <Registry />
                </div>
              </div>
              <div className="SolutionsContent">
                <h3>Registry</h3>
                <div>
                  Store and distribute Docker images in a secure, private repository.
                </div>
              </div>
            </div>
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <Cloud />
              </div>
              <div className="SolutionsContent">
                <h3>MultiCloud</h3>
                <div>
                  Enjoy the flexibility of moving workloads between
                  public and private clouds, as needs and costs fluctuate.
                </div>
              </div>
            </div>
            <div className="SolutionsContainer">
              <div className="SolutionsIcon">
                <Monitoring />
              </div>
              <div className="SolutionsContent">
                <h3>Monitoring</h3>
                <div>
                  Analyze metrics and logs about your applications.
                  With this transparency, you’re billed only what you utilize.
                </div>
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


export default connect(mapStateToProps)(withRouter(LandingPage));
