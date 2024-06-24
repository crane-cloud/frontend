import React from 'react';
import PropTypes from 'prop-types';
import styles from './SmallProjectCard.css';

const SmallProjectCard = ({featuredProject}) => {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.cardHeader}`}>
        <div>
            <h3>{featuredProject.name}</h3>
            <button btntype="new" class="Primary-Btn undefined false SmallBtn undefined undefined undefined">+ Follow</button>
        </div>
      </div>
      <div className={styles.cardBody}>
        <p>{featuredProject.description}</p>
        <img src={featuredProject.img} width={30}  alt='owner_img'/>
      </div>
    </div>
  );
};

SmallProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SmallProjectCard;
