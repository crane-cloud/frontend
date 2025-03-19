import React from "react";
import styles from "./InfoTooltip.module.css";

const InfoTooltip = ({ content }) => {
  return (
    <div className={styles.tooltipContainer}>
      <span className={styles.infoIcon} aria-label="More information">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 7V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      </span>

      <div className={styles.tooltipContent}>{content}</div>
    </div>
  );
};

export default InfoTooltip;
