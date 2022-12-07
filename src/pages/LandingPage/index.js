import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NewHeader from "../../components/NewHeader";
import LandingFooter from "../../components/LandingFooter";
import { ReactComponent as InfrastrucurePic } from "../../assets/images/infrastructure.svg";
import { ReactComponent as RightArrow } from "../../assets/images/rightArrow.svg";
import { ReactComponent as Databases } from "../../assets/images/databases.svg";
import { ReactComponent as Monitoring } from "../../assets/images/monitoring.svg";
import { ReactComponent as Container } from "../../assets/images/container.svg";
import { ReactComponent as Orch } from "../../assets/images/orcherstration.svg";
import { ReactComponent as Registry } from "../../assets/images/registry.svg";
import { ReactComponent as Cloud } from "../../assets/images/multicloud.svg";
import { ReactComponent as Postgres } from "../../assets/images/postgre.svg";
import { ReactComponent as Mysql } from "../../assets/images/mysql.svg";
import { ReactComponent as Python } from "../../assets/images/python.svg";
import { ReactComponent as ReactIcon } from "../../assets/images/react.svg";
import { ReactComponent as Wordpress } from "../../assets/images/wordpress.svg";
import { ReactComponent as Php } from "../../assets/images/php.svg";
import { ReactComponent as Nodejs } from "../../assets/images/nodejs.svg";
import { ReactComponent as Lara } from "../../assets/images/laravel.svg";
import { ReactComponent as Java } from "../../assets/images/java.svg";
import { ReactComponent as Javascript } from "../../assets/images/javascript.svg";
import { ReactComponent as Flask } from "../../assets/images/flask.svg";
import { ReactComponent as DockerIcon } from "../../assets/images/docker.svg";
import { ReactComponent as Django } from "../../assets/images/django.svg";
import { ReactComponent as Clang } from "../../assets/images/c.svg";
import { ReactComponent as Angular } from "../../assets/images/angularjs.svg";
import { ReactComponent as Html } from "../../assets/images/html.svg";
import { ReactComponent as CSS } from "../../assets/images/css.svg";
import { ReactComponent as Drupal } from "../../assets/images/drupal.svg";
import { onUnload } from "../../helpers/localStorage";
import SecondaryButton from "../../components/SecondaryButton";
import { DOCS_URL } from "../../config";
import styles from "./LandingPage.module.css";

const LandingPage = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  useEffect(() => {
    // This is meant to clear localstorage when the window is closed
    window.addEventListener("beforeunload", onUnload);

    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
  return (
    <div className={styles.LandingPageMain}>
      <NewHeader />
      <div
        className={`${styles.LandingPageMainContainer} 'LandingPageDashboardContainer'`}
      >
        <div className={styles.LandingPageMainContent}>
          <div className={styles.LandingPageMainContentInfo}>
            <div className={styles.LandingPageMainContentTitle}>
              Managed Cloud Services
            </div>
            <div className={styles.LandingParagraph}>
              Crane Cloud is an open source multi-cloud software platform for
              cloud-native application deployment and management.
            </div>
            <Link to="/register">
              <button className={styles.FreeTrialButton}>
                <div>Start Free Trial</div>
                <RightArrow />
              </button>
            </Link>
          </div>
          <div className={styles.LandingPageMainContentImg}>
            <InfrastrucurePic className={styles.LandingPageInfrastructurePic} />
          </div>
        </div>
        <div className={styles.LandingPageWhySectionWithBanner}>
          <div className={styles.LandingPageWhySection}>
            <div className={styles.LandingPageWhySectionTitle}>
              <h2>Why Crane Cloud</h2>
            </div>
            <div className={styles.WhySectionContent}>
              <div className={styles.DataCenterImage}>
                <img
                  alt="data-center"
                  src={require("../../assets/images/server_image.jpg")}
                />
              </div>

              <div className={styles.WhySectionChildContainer}>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>
                    Infrastructure
                  </div>
                  <div>Fast, agile, and resilient infrastructure.</div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Cost</div>
                  <div>
                    Reduce costs and save money by getting billed only what you
                    utilize.
                  </div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Security</div>
                  <div>
                    Images are automatically scanned for vulnerabilities, and
                    deployed with a free SSL certificate.
                  </div>
                </div>
                <div className={styles.WhySectionItem}>
                  <div className={styles.WhySectionCardTitle}>Support</div>
                  <div>
                    Create a ticket, chat, or call a specialist regarding any
                    queries.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.PageBannerSection}>
            <div className={styles.LeftPageBannerSection}>
              <div className={styles.LeftPageBannerInner}>
                <h2>Migrate to the cloud</h2>
                <p className={styles.BannerParagraph}>
                  Governments and institutions are urged to begin digital
                  transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.LandingPageWhySection}>
          <div className={styles.LandingPageWhySectionTitle}>
            <h2>Explore Crane Cloud Solutions</h2>
          </div>
          <div className={styles.SolutionsSection}>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Container />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Containers</h3>
                <div>
                  Quickly deploy modern, cloud-native applications or migrate
                  legacy systems to enable rapid incorporation of user feedback
                  for continuous improvement.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Orch />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Orcherstration</h3>
                <div>
                  We use Kubernetes to automate application rollouts, rollbacks,
                  and scaling to ensure your users never experience any
                  downtime.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Databases />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Databases</h3>
                <div>
                  Create, migrate, and manage data with secure, reliable, and
                  high performance SQL and NoSQL databases from Crane Cloud.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <div>
                  <Registry />
                </div>
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Registry</h3>
                <div>
                  Store and distribute Docker images in a secure, private
                  repository.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Cloud />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>MultiCloud</h3>
                <div>
                  Enjoy the flexibility of moving workloads between public and
                  private clouds, as needs and costs fluctuate.
                </div>
              </div>
            </div>
            <div className={styles.SolutionsContainer}>
              <div className={styles.SolutionsIcon}>
                <Monitoring />
              </div>
              <div className={styles.SolutionsContent}>
                <h3>Monitoring</h3>
                <div>
                  Analyze metrics and logs about your applications. With this
                  transparency, you’re billed only what you utilize.
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.DatabaseSection}>
          <div className={styles.LeftInfoSection}>
            <div className={styles.LeftInfoHeader}>
              Access your database anywhere
            </div>
            <div>
              Create your database at the click of a button. Crane Cloud enables
              you to access and manage your database from anywhere, whether it
              is filling in database details or managing it via a terminal.
            </div>
            <a
              href="https://medium.com/cranecloud/working-with-databases-on-crane-cloud-466179c41a32"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SecondaryButton label={"Read More"}>Read More</SecondaryButton>
            </a>
          </div>
          <div className={styles.DBContain}>
            <div className={styles.Flex}>
              <div className={styles.DBIcons}>
                <Mysql />
              </div>
              <div className={styles.DBIcons}>
                <Postgres />
              </div>
            </div>
            <div className={styles.DBChoose}>Choose your prefered choice.</div>
          </div>
        </section>
        <section className={styles.ApplicationSection}>
          <div className={styles.LeftInfoSection}>
            <div className={styles.LeftInfoHeader}>
              Applications in any stack
            </div>
            <div>
              As long as your application is containerized, it can run on Crane
              Cloud. With the provision of project overview metrics, down to
              individual application metrics and logs.
            </div>
            <a href={`${DOCS_URL}`} rel="noopener noreferrer" target="_blank">
              <SecondaryButton label={"Read More"}>Read More</SecondaryButton>
            </a>
          </div>
          <div className={styles.GridSide}>
            <div className={styles.IconSqure}>
              <Python />
            </div>
            <div className={styles.IconSqure}>
              <Php />
            </div>
            <div className={styles.IconSqure}>
              <Java />
            </div>
            <div className={styles.IconSqure}>
              <Javascript />
            </div>
            <div className={styles.IconSqure}>
              <Wordpress />
            </div>
            <div className={styles.IconSqure}>
              <Clang />
            </div>
            <div className={styles.IconSqure}>
              <Html />
            </div>
            <div className={styles.IconSqure}>
              <DockerIcon />
            </div>
            <div className={styles.IconSqure}>
              <Drupal />
            </div>
          </div>
        </section>
        <section className={styles.StackSection}>
          <div className={styles.LeftInfoSection}>
            <div className={styles.LeftInfoHeader}>Auto-containerization</div>
            <div>
              Unfamiliar with containerization or dockerization? Zip your
              application in any of these frameworks, upload it and Crane Cloud
              will dockerize, host the subsequent image and host your
              application.
            </div>
            <SecondaryButton
              label={"Read More"}
              // className={styles.AutoContainer}
            />
          </div>
          <div className={styles.GridSide}>
            <div className={styles.IconSqure}>
              <Django />
            </div>
            <div className={styles.IconSqure}>
              <Nodejs />
            </div>
            <div className={styles.IconSqure}>
              <Flask />
            </div>
            <div className={styles.IconSqure}>
              <ReactIcon />
            </div>
            <div className={styles.IconSqure}>
              <Angular />
            </div>
            <div className={styles.IconSqure}>
              <CSS />
            </div>
            <div className={styles.IconSqure}>
              <Lara />
            </div>
          </div>
        </section>
      </div>
      <div className={styles.LandingPageFooter}>
        <LandingFooter />
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(withRouter(LandingPage));
