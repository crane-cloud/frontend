import React from "react";
import styles from "./InputWithInfo.module.css";
import InfoTooltip from "../InfoTooltip";

const InputWithInfo = ({
  label,
  value,
  onChange,
  placeholder,
  info,
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.labelRow}>
        <label className={styles.formLabel}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
        {info && <InfoTooltip content={info} />}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.formInput}
      />
    </div>
  );
};

export default InputWithInfo;
