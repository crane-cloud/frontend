import React from "react";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import styles from "./TagDetailsPage.module.css";

const TagDetailsPage = () => {
  return (
    <>
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="Mainsection">
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header={<span>Explore</span>}
                showBtn={false}
                showBackBtn
              />
            </div>

            <div className="ContentSection">
              <div className={styles.dashboard}>
                <div className={styles.tagDetailsSection}>
                  <div className={styles.tagDetailsHeader}>
                    <span className={styles.tagName}>#ReactJs</span>
                    <button className={styles.followButton}>+ Follow</button>
                  </div>
                  <div className={styles.tagDetailsSubHeader}>
                    <span>90k followers</span>
                    <span>Created on 10/12/2023</span>
                  </div>

                  <div className={styles.tagDetailsCard}>
                    Found 100 public projects connected to this tag...
                  </div>
                </div>

                <div className={styles.moreTagsSection}>
                  <div className={styles.tagDetailsCard}>1232o2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagDetailsPage;
