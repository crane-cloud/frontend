import React from "react";
import styles from "./Pagination.module.css"

function leastTensNumber(num) {
  let reminder = num % 4;
  return num - reminder === 0 ? 1 : num - reminder;
}

function greatestTensNumber(num) {
  let reminder = num % 4;
  return num + 4 - reminder;
}

const Pagination = ({ total, current, onPageChange }) => {
  const showFirstLastButtons = total > 3;
  const firstPage = leastTensNumber(current);
  const lastPage =
    greatestTensNumber(current) <= total ? greatestTensNumber(current) : total;

  const pageButtons = [];

  for (let i = firstPage; i <= lastPage; i++) {
    const isCurrentPage = i === current;
    pageButtons.push(
      <button
        key={i}
        className={
          isCurrentPage ? styles.selectedPaginationBox:styles.paginationBox
        }
        onClick={() => {
          onPageChange(i);
        }}
        disabled={isCurrentPage}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      {showFirstLastButtons && (
        <button
          className={styles.navArrow}
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          &lt;
        </button>
      )}

      {firstPage > 3 && (
        <>
          <button
            className={
              current === 1 ?  styles.selectedPaginationBox : styles.paginationBox
          }
            onClick={() => {
              onPageChange(1);
            }}
            disabled={current === 1}
          >
            {1}
          </button>
          <span className={styles.dotsMargin}>..</span>
        </>
      )}

      {pageButtons}

      {total > 3 && lastPage !== total && (
        <>
          <span className={styles.dotsMargin}>..</span>
          <button
            className={
              current === total - 1 ?  styles.selectedPaginationBox:styles.paginationBox
            }
            onClick={() => {
              onPageChange(total - 1);
            }}
            disabled={current === total - 1}
          >
            {total - 1}
          </button>
          <button
            
            className={
              current === total ?  styles.selectedPaginationBox: styles.paginationBox
            }
            onClick={() => {
              onPageChange(total);
            }}
            disabled={current === total}
          >
            {total}
          </button>
        </>
      )}

      {showFirstLastButtons && (
        <button
          className={styles.navArrow}
          onClick={() => onPageChange(current + 1)}
          disabled={current === total}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
