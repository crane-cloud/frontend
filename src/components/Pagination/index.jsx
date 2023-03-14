import React from "react";

import { ReactComponent as LeftArrow } from "../../assets/images/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";

import styles from "./Pagination.module.css";

const Pagination = () => {
    return (
    <>
    <div className={styles.NavigatorSection}>
    <div className={styles.ArrowDiv}>
    <LeftArrow/>
    </div>
    <div className={styles.PaginationItemcontainer} >
      <div className={styles.PaginationItem}>1</div>
      <div className={styles.PaginationItem}>2</div>
      <div className={styles.PaginationItem}>3</div>
    </div>
    <div className={styles.ArrowDiv}>
    <RightArrow/>
    </div>
    </div>
    </>
    );
};

export default Pagination;
