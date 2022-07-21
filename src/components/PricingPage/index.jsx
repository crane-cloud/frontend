import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NewHeader from "../NewHeader";
import LandingFooter from "../LandingFooter";

import styles from "./PricingPage.module.css";

const PricingPage = (props) => {
  let { user } = props;
  if (user.data.id === undefined) {
    user = false;
  }
  return (
    <div className={styles.PricingPageMain}>
      <NewHeader />
        <div className={styles.InforContainer}>
            <div className={styles.PrimaryTitle}>
             Choose a plan 
             </div>
             <div className={styles.PrimaryTitleLower}>
             that's right for you
             </div>
             <div className={styles.SecondaryTitle}>
             This price is charged in propotion to the resources the 
             </div>
             <div className={styles.SecondaryTitle}>
             applications (projects) have consumed by the end of the calendar month
             </div>
        </div>
        <div className={styles.PricingGridContainer}>
        <div className={styles.PricingGrid}>
        <div className={styles.InnerPricingGird}>
           <div className={styles.InnerGridTitle}>
               CPU
            </div>
            <div className={styles.InnerGridText}>
            For individuals or teams just getting started with project management.
            </div>
            <div className={styles.InnerGridPrice}>
            <div className={styles.Price}>
                $1
            </div>
            <div className={styles.PriceDetail}>
                per 1k seconds
            </div>
            </div>
        </div>
        <div className={styles.verticalLine}> </div>

        <div className={styles.InnerPricingGird}>
           <div className={styles.InnerGridTitle}>
               RAM
            </div>
            <div className={styles.InnerGridText}>
              For teams or companies that need to manage work across initiatives.
            </div>
            <div className={styles.InnerGridPrice}>
            <div className={styles.Price}>
                $4
            </div>
            <div className={styles.PriceDetail}>
                per GB
            </div>
            </div>
        </div>
        <div className={styles.verticalLine}> </div>

        <div className={styles.InnerPricingGird}>
           <div className={styles.InnerGridTitle}>
              Network
            </div>
            <div className={styles.InnerGridText}>
            For teams or companies that need to manage work across initiatives.
            </div>
            <div className={styles.InnerGridPrice}>
            <div className={styles.Price}>
                1$
            </div>
            <div className={styles.PriceDetail}>
                per 1k requests/invocations
            </div>
            </div>
        </div>
        <div className={styles.verticalLine}> </div>

        <div className={styles.InnerPricingGird}>
           <div className={styles.InnerGridTitle}>
               Storage
            </div>
            <div className={styles.InnerGridText}>
            For organisations that need additional security, control and support.
            </div>
            <div className={styles.InnerGridPrice}>
            <div className={styles.Price}>
                1$
            </div>
            <div className={styles.PriceDetail}>
                per GB
            </div>
            </div>
        </div>
        <div className={styles.verticalLine}> </div>

        <div className={styles.InnerPricingGird}>
           <div className={styles.InnerGridTitle}>
               Database
            </div>
            <div className={styles.InnerGridText}>
            For organisations that need additional security, control and support.
            </div>
            <div className={styles.InnerGridPrice}>
            <div className={styles.Price}>
              $1
            </div>
            <div className={styles.PriceDetail}>
                per GB (We won't be tracking CPU,RAM and network).
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

export const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(withRouter(PricingPage));

