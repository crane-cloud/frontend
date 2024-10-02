import React, { useState, useEffect } from 'react';
import styles from './PillSelectComponent.module.css';

const PillsSelector = ({ options, selectedOptionCallBack }) => {

  const [selectedOption, setSelectedOption] = useState(null);



  useEffect(() => {
    if (selectedOption) {
      selectedOptionCallBack(selectedOption);
    }
  }, [selectedOption, selectedOptionCallBack]);

  return (
    <div className={styles.container}>
      {options &&
        options.map((option, index) => (
          <div
            key={index}
            className={`${styles.pill} ${
              selectedOption?.name === option?.name ? styles.selected : ''
            }`}
            
            onClick={() => setSelectedOption(option)}
          >
            {selectedOption === option && <span className={styles.checkmark}>✔</span>}
            {option.name}
          </div>
        ))}
    </div>
  );
};

export default PillsSelector;
