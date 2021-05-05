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
import Styles from './LandingPage.module.css';

const LandingPage = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  return (
    <div className={Styles.LandingPageMain}>
      <NewHeader />
      <div className={Styles.LandingPageMainContainer}>
        <div className={Styles.LandingPageMainContent}>
          <div className={Styles.LandingPageMainContentInfo}>

            <h1 className={Styles.LandingPageMainContentTitle}>Managed Cloud Services</h1>
            <div className="bold">
              Crane Cloud is an open source multi-cloud software platform for
              cloud-native application deployment and management.
            </div>
            <Link to="/register">
              <button className={Styles.FreeTrialButton}>
                <div>Start Free Trial</div>
                <RightArrow />
              </button>
            </Link>

          </div>
          <div className={Styles.LandingPageMainContentImg}>
            <InfrastrucurePic className={Styles.LandingPageInfrastructurePic} />
          </div>
        </div>
        <div className={Styles.LandingPageWhySection}>
          <div className={Styles.LandingPageWhySectionTitle}>
            <h2>Why Crane Cloud</h2>
          </div>
          <div className={Styles.WhySectionContent}>
            <div className={Styles.DataCenterImage}>
              <img alt="data-center" src={require('../../assets/images/server_image.jpg')} />

            </div>

            <div className={Styles.WhySectionChildContainer}>
              <div className={'{Styles.WhySectionItem} {Styles.CosTwo}'}>
                <div className={Styles.WhySectionCardTitle}>Infrastructure</div>
                <div>Fast, agile, and resilient infrastructure.</div>
              </div>
              <div className={'{Styles.WhySectionItem} {Styles.CosTwo}'}>
                <div className={Styles.WhySectionCardTitle}>Cost</div>
                <div>Reduce costs and save money by getting billed only what you utilize.</div>
              </div>
              <div className={'{Styles.WhySectionItem} {Styles.CosTwo}'}>
                <div className={Styles.WhySectionCardTitle}>Security</div>
                <div>
                  Images are automatically scanned for vulnerabilities, and deployed with a free SSL certificate.
                </div>
              </div>
              <div className={'{Styles.WhySectionItem} {Styles.CosTwo}'}>
                <div className={Styles.WhySectionCardTitle}>Support</div>
                <div>Create a ticket, chat, or call a specialist regarding any queries.</div>
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
