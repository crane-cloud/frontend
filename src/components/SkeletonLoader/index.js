import React from 'react';
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonLoader}>
      <div className={`${styles.skeleton} ${styles.short}`} />
      <div className={`${styles.skeleton} ${styles.medium}`} />
      <div className={`${styles.skeleton} ${styles.long}`} />
      <div className={`${styles.skeleton} ${styles.long}`} />
      <div className={`${styles.skeleton} ${styles.long}`} />
    </div>
  );
};

export default SkeletonLoader;
