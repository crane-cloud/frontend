import React, { useState, useEffect } from 'react';
import styles from './PillSelectComponent.module.css';
import useMedia from '../../hooks/mediaquery';

const PillsSelector = ({ options, selectedOptionCallBack }) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [positions, setPositions] = useState([]);
  const isDesktop = useMedia();

  // Generate grid positions with some variation in height
  const generatePositions = () => {
    const columns = 3; 
    return options.map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      return {
        top: row * 100 + Math.random() * 40, 
        left: col * 280 + Math.random() * 40, 
      };
    });
  };

  useEffect(() => {
    setPositions(generatePositions());
  }, [selectedOption]);

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
            style={isDesktop ? {
              position: 'absolute',
              top: `${positions[index]?.top || 0}px`,
              left: `${positions[index]?.left || 0}px`,
            }: {display: 'flex', flexDirection: 'column', width: '100%'}}
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
