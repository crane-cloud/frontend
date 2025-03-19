import React, { useState, useRef, useEffect } from "react";
import styles from "./NewSelect.module.css";
import InfoTooltip from "../InfoTooltip";

const EnhancedSelect = ({
  label,
  options,
  placeholder,
  onChange,
  value,
  info,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange && onChange(option);
  };

  return (
    <div className={styles.formGroup}>
      {label && (
        <div className={styles.labelRow}>
          <label className={styles.formLabel}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
          {info && <InfoTooltip content={info} />}
        </div>
      )}

      <div className={styles.selectContainer} ref={dropdownRef}>
        <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
          <span>{selected ? selected.name : placeholder}</span>
          <svg
            className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option) => (
              <li key={option.id} className={styles.optionItem}>
                <div
                  className={`${styles.optionContent} ${
                    selected && selected.id === option.id ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.name}</span>
                  {option.info && (
                    <div className={styles.optionInfoContainer}>
                      <div className={styles.optionInfo}>{option.info}</div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EnhancedSelect;
