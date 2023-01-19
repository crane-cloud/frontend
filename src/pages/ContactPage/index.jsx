import React from "react";
import { withRouter } from "react-router-dom";
import NewHeader from "../../components/NewHeader";
// import { ReactComponent as Telephone } from "../../assets/images/telephone.svg";
import { ReactComponent as Mail } from "../../assets/images/mail.svg";
import { ReactComponent as Thumb } from "../../assets/images/thumb.svg";
import { ReactComponent as TwitterIcon } from "../../assets/images/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../assets/images/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/Linkedin.svg";
import { ReactComponent as MediumIcon } from "../../assets/images/medium.svg";
import { ReactComponent as Location } from "../../assets/images/location.svg";
import { ReactComponent as Map } from "../../assets/images/map.svg";
import LandingFooter from "../../components/LandingFooter";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div className={styles.ContactPage}>
      <div className={styles.ContactPageMain}>
        <NewHeader />
        <div className={styles.InformationContainer}>
          <div className={styles.PrimaryTitle}>Get in touch</div>
          <div className={styles.SecondaryTitle}>
            Incase you have trouble using the platform, you can reach out to us
            using the details below
          </div>
        </div>
        <div className={styles.ContactGridContainer}>
          <div className={styles.ContactGrid}>
            
            <div className={styles.InnerContactGird}>
              <div className={styles.InnerGridTitle}>
                <Mail className={styles.MailSmall} />
              </div>
              <div className={styles.InnerGridTitleText}>Email Us</div>
              <div className={styles.InnerGridContact}>
                <div className={styles.ContactName}>Support</div>
                <div className={styles.Contact}>info[@]cranecloud.io</div>
              </div>
            </div>

            <div className={styles.InnerContactGird}>
              <div className={styles.InnerGridTitle}>
                <Thumb className={styles.ThumbSmall} />
              </div>
              <div className={styles.InnerGridTitleText}>Follow Us</div>
              <div className={styles.InnerGridContact}>
                <div className={styles.ContactName}>Platforms</div>
                <div>
                  <a
                    href="https://twitter.com/cranecloud_io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className={styles.Socials} />
                  </a>
                  <a
                    href="https://www.facebook.com/CraneCloud.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className={styles.Socials} />
                  </a>
                  <a
                    href="https://www.facebook.com/CraneCloud.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className={styles.Socials} />
                  </a>
                  <a
                    href="https://medium.com/cranecloud"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MediumIcon className={styles.Socials} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.LocationGridContainer}>
          <div className={styles.LocationGrid}>
            <div className={styles.InnerAddressGird}>
              <div className={styles.LocationIcon}>
                <div className={styles.InnerGridTitle}>
                  <Location className={styles.LocationSmall} />
                </div>
              </div>
              <div className={styles.InnerLocationTitleText}>Visit Us</div>
              <div className={styles.InnerGridContact}>
                <div className={styles.ContactName}>Address details</div>
                <div className={styles.Contact}>
                  Software Centre, Level 3, Block B
                </div>
                <div className={styles.Contact}>
                  College of Computing and Information Sciences
                </div>
                <div className={styles.Contact}>Makerere University</div>
                <div className={styles.Contact}>Kampala, Uganda</div>
              </div>
            </div>
            <div className={styles.verticalLine}> </div>

            <div className={styles.InnerLocationGird}>
              <div className={styles.InnerGridTitle}>
                <Map className={styles.MapSmall} />
              </div>
              <div className={styles.InnerGridTitleText}>Map View</div>
              <div className={styles.MapGrid}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63836.05553771624!2d32.5617119312709!3d0.32667363868257215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0932c4cb69%3A0x8789ba0df5ad06e!2sCOCIS%20BLOCK%20B!5e0!3m2!1sen!2sug!4v1642592449504!5m2!1sen!2sug"
                  width={500}
                  height={300}
                  allowfullscreen=""
                  loading="lazy"
                  title="craneCloud"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.PageFooter}>
        <LandingFooter />
      </div>
    </div>
  );
};


export default (withRouter(ContactPage));
