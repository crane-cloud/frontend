import { useState } from 'react';
function usePaginator() {
  const [currentPage, setCurrentPage] = useState(1);
  function handleChangePage(newPage) {
    setCurrentPage(newPage)
  }
  return [currentPage, handleChangePage];
}
export default usePaginator;
